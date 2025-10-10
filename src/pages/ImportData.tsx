import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, CheckCircle, AlertCircle } from "lucide-react";
import { importPGDataFromFile } from "@/utils/importPGData";

const ImportData = () => {
  const [file, setFile] = useState(null);
  const [importing, setImporting] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && (selectedFile.name.endsWith('.csv') || selectedFile.name.endsWith('.xlsx'))) {
      setFile(selectedFile);
      setResult(null);
    } else {
      alert('Please select a CSV or Excel file');
    }
  };

  const handleImport = async () => {
    if (!file) return;

    setImporting(true);
    try {
      const result = await importPGDataFromFile(file);
      setResult(result);
    } catch (error) {
      setResult({ success: false, error: error.message });
    } finally {
      setImporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <Card className="p-8">
          <h1 className="text-2xl font-bold mb-6">Import PG Data</h1>
          
          <div className="space-y-6">
            <div>
              <Label htmlFor="file">Select CSV or Excel File</Label>
              <Input
                id="file"
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileChange}
                className="mt-2"
              />
            </div>

            {file && (
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm">Selected: {file.name}</p>
                <p className="text-xs text-gray-600">Size: {(file.size / 1024).toFixed(2)} KB</p>
              </div>
            )}

            <Button 
              onClick={handleImport} 
              disabled={!file || importing}
              className="w-full"
            >
              {importing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Importing...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Import Data
                </>
              )}
            </Button>

            {result && (
              <div className={`p-4 rounded-lg ${result.success ? 'bg-green-50' : 'bg-red-50'}`}>
                <div className="flex items-center gap-2">
                  {result.success ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-red-600" />
                  )}
                  <span className={result.success ? 'text-green-800' : 'text-red-800'}>
                    {result.success 
                      ? `Successfully imported ${result.count} PG records!`
                      : `Import failed: ${result.error}`
                    }
                  </span>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ImportData;