import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import api from '../utils/api';
import { shouldShowQuestion } from '../utils/conditionalLogic';

const FormViewer = () => {
  const { formId } = useParams();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  
  const [form, setForm] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState({});

  // Watch all form values for conditional logic
  const formValues = watch();

  useEffect(() => {
    fetchForm();
  }, [formId]);

  const fetchForm = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(`/forms/${formId}`);
      setForm(response.data.data);
    } catch (err) {
      setError('Failed to load form: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      setError(null);

      // Prepare form data with files
      const formData = new FormData();
      formData.append('answers', JSON.stringify(data));

      // Add uploaded files
      Object.entries(uploadedFiles).forEach(([questionKey, files]) => {
        files.forEach(file => {
          formData.append(`file_${questionKey}`, file);
        });
      });

      await api.post(`/forms/${formId}/submit`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setSuccess(true);
    } catch (err) {
      setError('Failed to submit form: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const FileUploadField = ({ question }) => {
    const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
      onDrop: (files) => {
        setUploadedFiles(prev => ({ ...prev, [question.questionKey]: files }));
      }
    });

    return (
      <div>
        <div
          {...getRootProps()}
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition"
        >
          <input {...getInputProps()} />
          <p className="text-gray-600">
            Drag & drop files here, or click to select files
          </p>
        </div>
        {acceptedFiles.length > 0 && (
          <div className="mt-2">
            <p className="text-sm font-medium text-gray-700">Selected files:</p>
            <ul className="text-sm text-gray-600">
              {acceptedFiles.map(file => (
                <li key={file.name}>• {file.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error && !form) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-xl">{error}</p>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="text-green-500 text-6xl mb-4">✓</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Thank You!
          </h2>
          <p className="text-gray-600 mb-6">
            Your response has been submitted successfully.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
          >
            Submit Another Response
          </button>
        </div>
      </div>
    );
  }

  // Get visible questions based on current answers
  const visibleQuestions = form.questions.filter(q =>
    shouldShowQuestion(q.conditionalRules, formValues)
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {form.title}
          </h1>
          {form.description && (
            <p className="text-gray-600 mb-6">{form.description}</p>
          )}

          {error && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {visibleQuestions.map((question) => (
              <div key={question.questionKey} className="space-y-2">
                <label className="block text-sm font-medium text-gray-900">
                  {question.label}
                  {question.required && <span className="text-red-500 ml-1">*</span>}
                </label>

                {question.type === 'singleLineText' && (
                  <input
                    type="text"
                    {...register(question.questionKey, {
                      required: question.required && `${question.label} is required`
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}

                {question.type === 'multilineText' && (
                  <textarea
                    {...register(question.questionKey, {
                      required: question.required && `${question.label} is required`
                    })}
                    rows="4"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}

                {question.type === 'singleSelect' && (
                  <select
                    {...register(question.questionKey, {
                      required: question.required && `${question.label} is required`
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">-- Select an option --</option>
                    {question.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                )}

                {question.type === 'multipleSelects' && (
                  <div className="space-y-2">
                    {question.options.map((option) => (
                      <label key={option} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          value={option}
                          {...register(question.questionKey, {
                            required: question.required && `${question.label} is required`
                          })}
                          className="w-4 h-4 text-blue-600"
                        />
                        <span className="text-sm text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                )}

                {question.type === 'multipleAttachments' && (
                  <FileUploadField question={question} />
                )}

                {errors[question.questionKey] && (
                  <p className="text-sm text-red-600">
                    {errors[question.questionKey].message}
                  </p>
                )}
              </div>
            ))}

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-md font-medium"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Form'}
              </button>
            </div>
          </form>
        </div>

        <div className="mt-4 text-center text-sm text-gray-500">
          Powered by Airtable Form Builder
        </div>
      </div>
    </div>
  );
};

export default FormViewer;
