import { Download, Eye } from "lucide-react";
import { InfoRow } from "./personal-info-section";

const mockNextOfKin = {
  name: "Mohammad Adepoju",
  relationship: "Father",
  phone: "08136789912",
  address: "24 Gimbiya Crescent, Abuja",
};

const mockDocuments = [
  "Passport Photograph",
  "Primary School Certificate",
  "O level Result",
  "Degree Certificate",
];

export function NextOfKinSection() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="bg-accent-green px-5 py-3">
        <h3 className="text-white font-semibold">Next of Kin</h3>
      </div>
      <div className="px-5 py-2">
        <InfoRow label="Name" value={mockNextOfKin.name} />
        <InfoRow label="Relationship" value={mockNextOfKin.relationship} />
        <InfoRow label="Phone" value={mockNextOfKin.phone} />
        <InfoRow label="Address" value={mockNextOfKin.address} />
      </div>
    </div>
  );
}

export function UploadedDocumentsSection() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="bg-accent-green px-5 py-3">
        <h3 className="text-white font-semibold">Uploaded Documents</h3>
      </div>
      <div className="px-5 py-2">
        {mockDocuments.map((doc) => (
          <div
            key={doc}
            className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
          >
            <span className="text-sm text-gray-700">{doc}</span>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-accent-green text-white text-xs font-medium hover:bg-primary-green/90 transition-colors">
                <Eye className="w-3.5 h-3.5" />
                Preview
              </button>
              <button className="p-1.5 rounded-md bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors">
                <Download className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}