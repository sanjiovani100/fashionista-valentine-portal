import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, CheckCircle2, XCircle } from 'lucide-react';
import { runAllTests } from '../tests/swimwearEventTests';

export const SwimwearTestRunner = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleRunTests = async () => {
    setIsRunning(true);
    try {
      const testResults = await runAllTests();
      setResults(testResults);
    } catch (error) {
      console.error('Test execution failed:', error);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-2xl font-bold mb-4">Swimwear Event Tests</h2>
      
      <Button 
        onClick={handleRunTests}
        disabled={isRunning}
        className="mb-4"
      >
        {isRunning ? 'Running Tests...' : 'Run All Tests'}
      </Button>

      {results && (
        <div className="space-y-2">
          {Object.entries(results).map(([test, result]) => (
            <Alert key={test} variant={result ? 'default' : 'destructive'}>
              {result ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : (
                <XCircle className="h-4 w-4" />
              )}
              <AlertDescription>
                {test}: {result ? 'Passed' : 'Failed'}
              </AlertDescription>
            </Alert>
          ))}
        </div>
      )}
    </div>
  );
};