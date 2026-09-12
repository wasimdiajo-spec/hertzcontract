/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Upload, FileText, Save, Check } from 'lucide-react';
import ContractForm from './components/ContractForm';
import { PWAInstallButton } from './components/PWAInstallButton';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';

export default function App() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    carGroup: '',
    carType: 'XTRAIL',
    carNo: '7052909',
    agrNo: '',
    dateOut: '07/09/2026',
    timeOut: '10:30',
    dateIn: '',
    timeIn: '',
    kmOut: '',
    kmIn: '',
    kmAllwd: 'open',
    kmDrvn: '',
    methodOfPayment: 'VISA',
    placeOfPayment: 'MSAB',
    toBePaidBy: '',
    renter: 'American Embassy - MSAB',
    address: '',
    tel: '',
    placeOfBirth: '',
    dateOfBirth: '',
    licenseNo: '',
    dateOfIssue: '',
    issuedBy: 'USA',
    expiryDate: '',
    nationalityPassportNo: 'American -',
    countryOfIssue: '',
    entryDateToJordan: '',
    via: 'MSAB',
    addDriver: '',
    addDriverPlaceOfBirth: '',
    addDriverDateOfBirth: '',
    addDriverLicenseNo: '',
    addDriverDateOfIssue: '',
    addDriverIssuedBy: '',
    addDriverExpiryDate: '',
    
    // Billing / Rate section
    rntlType: 'DAILY',
    days: '5',
    rateCharge: '120',
    extraKilos: '',
    extraHours: '',
    cdw: '',
    tp: '',
    pai: '',
    pickUp: '',
    dropOff: '',
    coAdditionalDriver: '',
    babySeat: '',
    subTotal1: 'ZERO',
    salesTax: '',
    subTotal2: '',
    gas: '',
    accidents: '',
    misc: '',
    subTotal3: '',
    totalDeductions: '',
    totalCharges: '',
    totalPayments: '',
    
    // Footer
    openedBy: 'WASIM DIA',
    dropOffPlace: 'MSAB',
    euroSwapNo: '',
    codeNo: '',
    ccExpiryDate: '',
    creditCardNo: '',
    clientName: ''
  });

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setLoading(true);
    setSuccess(false);

    try {
      const images: { data: string; mimeType: string }[] = [];
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        
        const base64Data = await new Promise<string>((resolve) => {
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.readAsDataURL(file);
        });
        
        images.push({
          data: base64Data,
          mimeType: file.type
        });
      }

      const response = await fetch('/api/extract', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ images }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to extract data');
      }
      
      // Update form with extracted data
      setFormData(prev => ({
        ...prev,
        toBePaidBy: data.fullName?.toUpperCase() || prev.toBePaidBy,
        clientName: data.fullName || prev.clientName,
        address: data.address || prev.address,
        dateOfBirth: data.dateOfBirth || prev.dateOfBirth,
        licenseNo: data.licenseNo || prev.licenseNo,
        dateOfIssue: data.dateOfIssue || prev.dateOfIssue,
        expiryDate: data.expiryDate || prev.expiryDate,
        creditCardNo: data.creditCardNo || prev.creditCardNo,
        ccExpiryDate: data.ccExpiryDate || prev.ccExpiryDate,
      }));
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error: any) {
      console.error('Error uploading and parsing files:', error);
      alert(`Error: ${error.message || 'Please try again.'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleFieldChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    // Generate a PDF from the Contract Form
    const element = document.getElementById('contract-form-container');
    if (!element) return;
    
    setIsSaving(true);
    try {
      // Use html-to-image to capture the form, which supports modern CSS like oklch
      const imgData = await toPng(element, { quality: 1, pixelRatio: 2 });
      
      // Initialize a new PDF (A4 size)
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      
      // We need to calculate height based on the rendered element's aspect ratio
      const elementWidth = element.offsetWidth;
      const elementHeight = element.offsetHeight;
      const pdfHeight = (elementHeight * pdfWidth) / elementWidth;
      
      // Add the image to the PDF
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      
      // Download the PDF
      pdf.save('Hertz-Contract.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      // Fallback to browser print if library fails
      window.print();
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 font-sans text-sm print:bg-white print:py-0">
      <div className="max-w-7xl mx-auto space-y-8 print:space-y-0 print:max-w-none">
        
        {/* Header and Upload Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 print:hidden">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <FileText className="h-6 w-6 text-yellow-500" />
                Hertz Contract Streamline
              </h1>
              <p className="text-gray-500 mt-1">Upload ID and Credit Card to auto-fill the rental agreement.</p>
            </div>
            
            <div className="flex items-center gap-4">
              <PWAInstallButton />
              <label className="relative cursor-pointer bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-2 px-4 rounded-lg shadow-sm transition-colors flex items-center gap-2">
                <Upload className="h-4 w-4" />
                <span>Upload Documents</span>
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*,application/pdf" 
                  multiple 
                  onChange={handleFileUpload}
                  disabled={loading}
                />
              </label>
              
              {loading && (
                <div className="flex items-center gap-2 text-blue-600">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-b-transparent border-blue-600"></div>
                  <span className="text-sm font-medium">Extracting...</span>
                </div>
              )}
              
              {success && (
                <div className="flex items-center gap-2 text-green-600">
                  <Check className="h-4 w-4" />
                  <span className="text-sm font-medium">Data Auto-filled!</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Contract Form */}
        <div id="contract-form-container" className="print:m-0 print:p-0">
          <ContractForm data={formData} onChange={handleFieldChange} />
        </div>
        
        <div className="flex justify-end pt-4 pb-12 print:hidden">
          <button 
            onClick={handleSave} 
            disabled={isSaving}
            className="bg-gray-900 hover:bg-gray-800 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-colors flex items-center gap-2"
          >
            {isSaving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-b-transparent border-white"></div>
                Generating PDF...
              </>
            ) : (
              <>
                <Save className="h-5 w-5" />
                Save Contract (PDF)
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
