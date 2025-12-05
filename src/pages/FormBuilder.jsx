import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

const FormBuilder = () => {
  const navigate = useNavigate();
  
  // Step management
  const [currentStep, setCurrentStep] = useState(1);
  
  // Form data
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    airtableBaseId: '',
    airtableTableId: '',
    airtableBaseName: '',
    airtableTableName: '',
    questions: []
  });

  // Airtable data
  const [bases, setBases] = useState([]);
  const [tables, setTables] = useState([]);
  const [fields, setFields] = useState([]);
  
  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch bases on mount
  useEffect(() => {
    fetchBases();
  }, []);

  const fetchBases = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/airtable/bases');
      setBases(response.data.data);
    } catch (err) {
      setError('Failed to fetch bases: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBaseSelect = async (baseId) => {
    const selectedBase = bases.find(b => b.id === baseId);
    
    setFormData(prev => ({
      ...prev,
      airtableBaseId: baseId,
      airtableBaseName: selectedBase?.name || '',
      airtableTableId: '',
      airtableTableName: '',
      questions: []
    }));

    if (baseId) {
      try {
        setIsLoading(true);
        const response = await api.get(`/airtable/bases/${baseId}/tables`);
        setTables(response.data.data);
      } catch (err) {
        setError('Failed to fetch tables: ' + err.message);
      } finally {
        setIsLoading(false);
      }
    } else {
      setTables([]);
    }
  };

  const handleTableSelect = async (tableId) => {
    const selectedTable = tables.find(t => t.id === tableId);
    
    setFormData(prev => ({
      ...prev,
      airtableTableId: tableId,
      airtableTableName: selectedTable?.name || '',
      questions: []
    }));

    if (tableId && formData.airtableBaseId) {
      try {
        setIsLoading(true);
        const response = await api.get(
          `/airtable/bases/${formData.airtableBaseId}/tables/${tableId}/fields`
        );
        
        // Initialize questions from supported fields
        const supportedFields = response.data.data.fields;
        const initialQuestions = supportedFields.map((field, index) => ({
          questionKey: field.name.toLowerCase().replace(/\s+/g, '_'),
          airtableFieldId: field.id,
          airtableFieldName: field.name,
          label: field.name,
          type: field.type,
          required: false,
          options: field.options?.choices?.map(c => c.name) || [],
          conditionalRules: null,
          order: index,
          selected: false
        }));
        
        setFields(supportedFields);
        setFormData(prev => ({ ...prev, questions: initialQuestions }));
      } catch (err) {
        setError('Failed to fetch fields: ' + err.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const toggleFieldSelection = (questionKey) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.map(q =>
        q.questionKey === questionKey ? { ...q, selected: !q.selected } : q
      )
    }));
  };

  const updateQuestion = (questionKey, updates) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.map(q =>
        q.questionKey === questionKey ? { ...q, ...updates } : q
      )
    }));
  };

  const addCondition = (questionKey) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.map(q => {
        if (q.questionKey === questionKey) {
          const rules = q.conditionalRules || { logic: 'AND', conditions: [] };
          return {
            ...q,
            conditionalRules: {
              ...rules,
              conditions: [
                ...rules.conditions,
                { questionKey: '', operator: 'equals', value: '' }
              ]
            }
          };
        }
        return q;
      })
    }));
  };

  const updateCondition = (questionKey, conditionIndex, updates) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.map(q => {
        if (q.questionKey === questionKey && q.conditionalRules) {
          const newConditions = [...q.conditionalRules.conditions];
          newConditions[conditionIndex] = { ...newConditions[conditionIndex], ...updates };
          return {
            ...q,
            conditionalRules: {
              ...q.conditionalRules,
              conditions: newConditions
            }
          };
        }
        return q;
      })
    }));
  };

  const removeCondition = (questionKey, conditionIndex) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.map(q => {
        if (q.questionKey === questionKey && q.conditionalRules) {
          const newConditions = q.conditionalRules.conditions.filter((_, i) => i !== conditionIndex);
          return {
            ...q,
            conditionalRules: newConditions.length > 0 
              ? { ...q.conditionalRules, conditions: newConditions }
              : null
          };
        }
        return q;
      })
    }));
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Filter only selected questions
      const selectedQuestions = formData.questions
        .filter(q => q.selected)
        .map(({ selected, ...rest }) => rest);

      if (selectedQuestions.length === 0) {
        setError('Please select at least one field for your form');
        return;
      }

      const payload = {
        ...formData,
        questions: selectedQuestions
      };

      const response = await api.post('/forms', payload);
      
      alert('Form created successfully!');
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to create form: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const canProceed = (step) => {
    switch (step) {
      case 1:
        return formData.title && formData.airtableBaseId;
      case 2:
        return formData.airtableTableId;
      case 3:
        return formData.questions.some(q => q.selected);
      default:
        return true;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Create New Form</h1>

        {/* Progress Steps */}
        <div className="mb-8 flex items-center justify-between">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center flex-1">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                currentStep >= step 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-300 text-gray-600'
              }`}>
                {step}
              </div>
              {step < 4 && (
                <div className={`flex-1 h-1 mx-2 ${
                  currentStep > step ? 'bg-blue-600' : 'bg-gray-300'
                }`} />
              )}
            </div>
          ))}
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* Step 1: Basic Info & Base Selection */}
        {currentStep === 1 && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Step 1: Form Details & Base Selection</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Form Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Job Application Form"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description (optional)
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  placeholder="Describe your form..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Airtable Base *
                </label>
                <select
                  value={formData.airtableBaseId}
                  onChange={(e) => handleBaseSelect(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isLoading}
                >
                  <option value="">-- Select a base --</option>
                  {bases.map((base) => (
                    <option key={base.id} value={base.id}>
                      {base.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Table Selection */}
        {currentStep === 2 && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Step 2: Select Table</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Table *
              </label>
              <select
                value={formData.airtableTableId}
                onChange={(e) => handleTableSelect(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              >
                <option value="">-- Select a table --</option>
                {tables.map((table) => (
                  <option key={table.id} value={table.id}>
                    {table.name}
                  </option>
                ))}
              </select>
            </div>

            {formData.airtableTableId && (
              <div className="mt-4 p-3 bg-blue-50 rounded">
                <p className="text-sm text-blue-800">
                  ✓ Found {fields.length} supported fields in this table
                </p>
              </div>
            )}
          </div>
        )}

        {/* Step 3: Configure Questions */}
        {currentStep === 3 && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Step 3: Configure Questions</h2>
            
            <p className="text-sm text-gray-600 mb-4">
              Select fields to include in your form and customize their labels.
            </p>

            <div className="space-y-4">
              {formData.questions.map((question) => (
                <div
                  key={question.questionKey}
                  className={`border rounded-lg p-4 ${
                    question.selected ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      checked={question.selected}
                      onChange={() => toggleFieldSelection(question.questionKey)}
                      className="mt-1 w-4 h-4 text-blue-600"
                    />
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <span className="font-medium text-gray-900">
                            {question.airtableFieldName}
                          </span>
                          <span className="ml-2 text-xs px-2 py-1 bg-gray-100 rounded">
                            {question.type}
                          </span>
                        </div>
                      </div>

                      {question.selected && (
                        <div className="space-y-3 mt-3">
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Question Label
                            </label>
                            <input
                              type="text"
                              value={question.label}
                              onChange={(e) => updateQuestion(question.questionKey, { label: e.target.value })}
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md"
                            />
                          </div>

                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              checked={question.required}
                              onChange={(e) => updateQuestion(question.questionKey, { required: e.target.checked })}
                              className="w-4 h-4 text-blue-600"
                            />
                            <label className="ml-2 text-sm text-gray-700">
                              Required field
                            </label>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Conditional Logic */}
        {currentStep === 4 && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Step 4: Conditional Logic (Optional)</h2>
            
            <p className="text-sm text-gray-600 mb-4">
              Add rules to show/hide questions based on previous answers.
            </p>

            <div className="space-y-6">
              {formData.questions.filter(q => q.selected).map((question) => (
                <div key={question.questionKey} className="border rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-3">{question.label}</h3>
                  
                  {question.conditionalRules && question.conditionalRules.conditions.length > 0 ? (
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm text-gray-600">Show this field when:</span>
                        <select
                          value={question.conditionalRules.logic}
                          onChange={(e) => updateQuestion(question.questionKey, {
                            conditionalRules: { ...question.conditionalRules, logic: e.target.value }
                          })}
                          className="px-2 py-1 text-sm border border-gray-300 rounded"
                        >
                          <option value="AND">All conditions match (AND)</option>
                          <option value="OR">Any condition matches (OR)</option>
                        </select>
                      </div>

                      {question.conditionalRules.conditions.map((condition, index) => (
                        <div key={index} className="flex items-center space-x-2 bg-gray-50 p-3 rounded">
                          <select
                            value={condition.questionKey}
                            onChange={(e) => updateCondition(question.questionKey, index, { questionKey: e.target.value })}
                            className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded"
                          >
                            <option value="">-- Select field --</option>
                            {formData.questions
                              .filter(q => q.selected && q.questionKey !== question.questionKey)
                              .map(q => (
                                <option key={q.questionKey} value={q.questionKey}>
                                  {q.label}
                                </option>
                              ))}
                          </select>

                          <select
                            value={condition.operator}
                            onChange={(e) => updateCondition(question.questionKey, index, { operator: e.target.value })}
                            className="px-2 py-1 text-sm border border-gray-300 rounded"
                          >
                            <option value="equals">equals</option>
                            <option value="notEquals">not equals</option>
                            <option value="contains">contains</option>
                          </select>

                          <input
                            type="text"
                            value={condition.value}
                            onChange={(e) => updateCondition(question.questionKey, index, { value: e.target.value })}
                            placeholder="value"
                            className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded"
                          />

                          <button
                            onClick={() => removeCondition(question.questionKey, index)}
                            className="px-2 py-1 text-sm text-red-600 hover:bg-red-50 rounded"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 mb-2">No conditions set</p>
                  )}

                  <button
                    onClick={() => addCondition(question.questionKey)}
                    className="mt-2 text-sm text-blue-600 hover:text-blue-700"
                  >
                    + Add Condition
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="mt-6 flex justify-between">
          <button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Previous
          </button>

          {currentStep < 4 ? (
            <button
              onClick={() => setCurrentStep(currentStep + 1)}
              disabled={!canProceed(currentStep)}
              className="px-6 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isLoading || !canProceed(currentStep)}
              className="px-6 py-2 bg-green-600 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-700"
            >
              {isLoading ? 'Creating...' : 'Create Form'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormBuilder;
