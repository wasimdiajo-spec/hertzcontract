import React from 'react';

interface ContractFormProps {
  data: any;
  onChange: (field: string, value: string) => void;
}

export default function ContractForm({ data, onChange }: ContractFormProps) {
  const Input = ({ label, field, placeholder = '', className = '' }: any) => (
    <div className={`flex flex-col border-b border-r border-gray-300 p-1 ${className}`}>
      <label className="text-[10px] font-semibold text-gray-700 uppercase tracking-tight">{label}</label>
      <input
        type="text"
        className="w-full bg-transparent border-none focus:ring-0 text-sm font-medium p-1"
        value={data[field] || ''}
        onChange={(e) => onChange(field, e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );

  return (
    <div className="bg-white border-2 border-gray-400 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-yellow-400 p-4 flex justify-between items-center border-b-2 border-gray-400">
        <h2 className="text-3xl font-black italic tracking-tighter text-gray-900">Hertz.</h2>
        <div className="text-right">
          <p className="font-bold text-gray-900 text-lg uppercase">Shakhshir Rent a Car</p>
          <p className="text-xs text-gray-800">Hertz International Franchisee</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Main Left Column */}
        <div className="flex-1 border-r-2 border-gray-400">
          <div className="grid grid-cols-4 border-b border-gray-300">
            <Input label="Car Group" field="carGroup" />
            <Input label="Car Type" field="carType" />
            <Input label="Car No." field="carNo" />
            <Input label="Agr. No." field="agrNo" />
          </div>

          <div className="grid grid-cols-1 border-b border-gray-300">
            <Input label="To Be Paid By" field="toBePaidBy" />
          </div>

          <div className="grid grid-cols-1 border-b border-gray-300">
            <Input label="Renter" field="renter" />
          </div>

          <div className="grid grid-cols-1 border-b border-gray-300">
            <Input label="Address" field="address" />
          </div>

          <div className="grid grid-cols-1 border-b border-gray-300">
            <Input label="Tel." field="tel" />
          </div>

          <div className="grid grid-cols-2 border-b border-gray-300">
            <Input label="Place Of Birth" field="placeOfBirth" />
            <Input label="Date Of Birth" field="dateOfBirth" />
          </div>

          <div className="grid grid-cols-3 border-b border-gray-300">
            <Input label="License No." field="licenseNo" className="col-span-2" />
            <Input label="Date Of Issue" field="dateOfIssue" />
          </div>

          <div className="grid grid-cols-3 border-b border-gray-300">
            <Input label="Issued By" field="issuedBy" className="col-span-2" />
            <Input label="Expiry Date" field="expiryDate" />
          </div>

          <div className="grid grid-cols-1 border-b border-gray-300">
            <Input label="Nationality and Passport No." field="nationalityPassportNo" />
          </div>

          <div className="grid grid-cols-2 border-b border-gray-300">
            <Input label="Country Of Issue" field="countryOfIssue" />
            <Input label="Date Of Issue" field="dateOfIssue" />
          </div>

          <div className="grid grid-cols-2 border-b border-gray-300">
            <Input label="Entry Date To Jordan" field="entryDateToJordan" />
            <Input label="VIA" field="via" />
          </div>

          {/* Additional Driver Section */}
          <div className="bg-gray-100 p-1 border-b border-gray-300">
            <p className="text-[10px] font-bold uppercase">Additional Driver</p>
          </div>
          <div className="grid grid-cols-1 border-b border-gray-300">
            <Input label="Add. Driver" field="addDriver" />
          </div>
          <div className="grid grid-cols-2 border-b border-gray-300">
            <Input label="Place Of Birth" field="addDriverPlaceOfBirth" />
            <Input label="Date Of Birth" field="addDriverDateOfBirth" />
          </div>
          <div className="grid grid-cols-3 border-b border-gray-300">
            <Input label="License No." field="addDriverLicenseNo" className="col-span-2" />
            <Input label="Date Of Issue" field="addDriverDateOfIssue" />
          </div>
          <div className="grid grid-cols-3 border-b border-gray-300">
            <Input label="Issued By" field="addDriverIssuedBy" className="col-span-2" />
            <Input label="Expiry Date" field="addDriverExpiryDate" />
          </div>

          {/* Signatures & Bottom */}
          <div className="grid grid-cols-2">
            <div className="p-4 border-r border-gray-300 flex flex-col justify-between h-32">
              <div>
                <p className="text-xs font-bold text-center border-b border-gray-300 pb-1 mb-4">Signature</p>
              </div>
              <p className="text-[9px] leading-tight text-gray-500">By his signature, Renter accepts the additional daily charge to waive his responsibility according to the terms and conditions of this agreement.</p>
            </div>
            
            <div className="flex flex-col">
              <div className="p-1 bg-yellow-100 border-b border-gray-300 font-bold text-center text-xs">
                Insurance Type
              </div>
              <div className="flex justify-between border-b border-gray-300 p-1 text-xs">
                <span>CDR - Collision Damage Reduction</span>
                <span>____</span>
              </div>
              <div className="flex justify-between border-b border-gray-300 p-1 text-xs">
                <span>CDW - Collision Damage Waiver</span>
                <span>____</span>
              </div>
              <div className="flex justify-between border-b border-gray-300 p-1 text-xs">
                <span>TP - Theft Protection</span>
                <span>____</span>
              </div>
              <div className="flex justify-between border-b border-gray-300 p-1 text-xs">
                <span>PAI - Personal Accident Insurance</span>
                <span>____</span>
              </div>
              <div className="flex justify-between p-1 text-xs">
                <span>SW - Super Waiver (All Insurances)</span>
                <span>____</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-4 border-t-2 border-gray-400">
            <Input label="Opened By" field="openedBy" />
            <Input label="Drop Off Place" field="dropOffPlace" className="col-span-2" />
            <Input label="Euro Swap No." field="euroSwapNo" />
          </div>
          <div className="grid grid-cols-4 border-t border-gray-300 border-b border-gray-300">
            <Input label="4 Code No." field="codeNo" />
            <Input label="C.C. Expiry Date" field="ccExpiryDate" />
            <Input label="Credit Card No." field="creditCardNo" className="col-span-2 text-lg font-mono tracking-widest" />
          </div>

          <div className="p-2 flex gap-4 h-24">
            <div className="flex-1 flex flex-col">
              <label className="text-[10px] font-semibold">Date:</label>
            </div>
            <div className="flex-[2] flex flex-col border-l border-gray-300 pl-2">
              <label className="text-[10px] font-semibold">Full Name:</label>
              <div className="font-medium text-lg mt-1">{data.clientName}</div>
            </div>
          </div>

        </div>

        {/* Right Column / Sidebar */}
        <div className="w-full md:w-[350px] flex flex-col">
          <div className="grid grid-cols-2">
             <Input label="Date Out" field="dateOut" className="bg-yellow-50" />
             <Input label="Date In" field="dateIn" className="bg-yellow-50" />
             <Input label="Time Out" field="timeOut" className="bg-yellow-50" />
             <Input label="Time In" field="timeIn" className="bg-yellow-50" />
             <Input label="KM Out" field="kmOut" />
             <Input label="KM In" field="kmIn" />
             <Input label="KM Allwd" field="kmAllwd" />
             <Input label="KM Drvn" field="kmDrvn" />
             <Input label="Method Of Payment" field="methodOfPayment" />
             <Input label="Place Of Payment" field="placeOfPayment" />
          </div>
          
          {/* Rate table */}
          <div className="flex flex-col flex-1 border-t-2 border-gray-400">
            <div className="grid grid-cols-3 bg-yellow-100 border-b border-gray-300">
              <Input label="Rntl Type" field="rntlType" />
              <Input label="Days" field="days" />
              <div className="p-1 text-center font-bold text-xs border-r border-gray-300 bg-white"></div>
            </div>
            
            <div className="grid grid-cols-3 bg-yellow-100 border-b border-gray-300">
              <div className="col-span-2 p-1 font-bold text-xs border-r border-gray-300 text-center">Rental Description</div>
              <div className="grid grid-cols-2">
                <div className="text-center font-bold text-xs border-r border-gray-300 p-1">Out</div>
                <div className="text-center font-bold text-xs p-1">In</div>
              </div>
            </div>

            <div className="grid grid-cols-3 border-b border-gray-300">
              <div className="col-span-2 p-1 text-xs font-semibold border-r border-gray-300 bg-yellow-50">Rate Charge</div>
              <div className="p-1"><input type="text" className="w-full text-right bg-transparent text-sm" value={data.rateCharge} onChange={e => onChange('rateCharge', e.target.value)} /></div>
            </div>
            
            {[
              { label: 'Extra Kilos', field: 'extraKilos' },
              { label: 'Extra Hours', field: 'extraHours' },
              { label: 'CDW/CDR/SW', field: 'cdw' },
              { label: 'TP', field: 'tp' },
              { label: 'PAI', field: 'pai' },
              { label: 'Pick Up', field: 'pickUp' },
              { label: 'Drop Off', field: 'dropOff' },
              { label: 'Co./Additional Driver', field: 'coAdditionalDriver' },
              { label: 'Baby Seat', field: 'babySeat' },
            ].map((item, idx) => (
              <div key={idx} className="grid grid-cols-3 border-b border-gray-300">
                <div className="col-span-2 p-1 text-xs font-semibold border-r border-gray-300">{item.label}</div>
                <div className="p-1"><input type="text" className="w-full text-right bg-transparent text-sm" value={data[item.field] || ''} onChange={e => onChange(item.field, e.target.value)} /></div>
              </div>
            ))}
            
            <div className="grid grid-cols-3 border-b-2 border-gray-400 bg-gray-100">
              <div className="col-span-2 p-1 text-xs font-bold border-r border-gray-300">Sub_Total_1</div>
              <div className="p-1"><input type="text" className="w-full text-right bg-transparent text-sm font-bold" value={data.subTotal1} onChange={e => onChange('subTotal1', e.target.value)} /></div>
            </div>
            
            <div className="grid grid-cols-3 border-b border-gray-300">
              <div className="col-span-2 p-1 text-xs font-semibold border-r border-gray-300 bg-yellow-50">Sales Tax ( %)</div>
              <div className="p-1"><input type="text" className="w-full text-right bg-transparent text-sm" value={data.salesTax} onChange={e => onChange('salesTax', e.target.value)} /></div>
            </div>
            
            <div className="grid grid-cols-3 border-b border-gray-300">
              <div className="col-span-2 p-1 text-xs font-bold border-r border-gray-300">Sub_Total_2</div>
              <div className="p-1"><input type="text" className="w-full text-right bg-transparent text-sm font-bold" value={data.subTotal2} onChange={e => onChange('subTotal2', e.target.value)} /></div>
            </div>

            {[
              { label: 'Gas/Daily Gas/Full Tank', field: 'gas' },
              { label: 'Accidents', field: 'accidents' },
              { label: 'Misc', field: 'misc' },
            ].map((item, idx) => (
              <div key={idx} className="grid grid-cols-3 border-b border-gray-300">
                <div className="col-span-2 p-1 text-xs font-semibold border-r border-gray-300">{item.label}</div>
                <div className="p-1"><input type="text" className="w-full text-right bg-transparent text-sm" value={data[item.field] || ''} onChange={e => onChange(item.field, e.target.value)} /></div>
              </div>
            ))}

            <div className="grid grid-cols-3 border-b border-gray-300 bg-gray-100">
              <div className="col-span-2 p-1 text-xs font-bold border-r border-gray-300">Sub_Total_3</div>
              <div className="p-1"><input type="text" className="w-full text-right bg-transparent text-sm font-bold" value={data.subTotal3} onChange={e => onChange('subTotal3', e.target.value)} /></div>
            </div>
            <div className="grid grid-cols-3 border-b border-gray-300">
              <div className="col-span-2 p-1 text-xs font-semibold border-r border-gray-300 text-red-600">Total Deductions</div>
              <div className="p-1"><input type="text" className="w-full text-right bg-transparent text-sm text-red-600" value={data.totalDeductions} onChange={e => onChange('totalDeductions', e.target.value)} /></div>
            </div>
            <div className="grid grid-cols-3 border-b border-gray-300 bg-yellow-200">
              <div className="col-span-2 p-2 text-sm font-bold border-r border-gray-400">Total Charges</div>
              <div className="p-2"><input type="text" className="w-full text-right bg-transparent text-base font-bold" value={data.totalCharges} onChange={e => onChange('totalCharges', e.target.value)} /></div>
            </div>
            <div className="grid grid-cols-3 border-b border-gray-300 bg-gray-100">
              <div className="col-span-2 p-1 text-xs font-bold border-r border-gray-300">Total Payments</div>
              <div className="p-1"><input type="text" className="w-full text-right bg-transparent text-sm font-bold" value={data.totalPayments} onChange={e => onChange('totalPayments', e.target.value)} /></div>
            </div>
            
            <div className="p-4 bg-yellow-50 flex-1 flex flex-col justify-end">
              <p className="text-center font-bold text-sm text-gray-800">Need Outbound Reservations .. Contact us</p>
              <p className="text-center text-xs text-gray-600 mt-2">All Charges Are Subject To Sales Tax</p>
              <p className="text-center font-bold text-sm text-gray-800 mt-2">Thank You For Choosing Hertz</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
