export default function ExhibitionHallsView() {
  return (
    <svg className="w-full h-full" viewBox="0 0 3200 2000" xmlns="http://www.w3.org/2000/svg">
      {/* Background */}
      <rect width="3200" height="2000" fill="#f8f9fa" stroke="#e9ecef" strokeWidth="2" />
      
      {/* Hall 12 Section */}
      <g id="hall-12">
        <rect x="50" y="100" width="750" height="900" fill="rgba(59, 130, 246, 0.1)" stroke="#3b82f6" strokeWidth="3" />
        <text x="425" y="80" fontSize="24" fill="#3b82f6" fontFamily="Arial" textAnchor="middle" fontWeight="bold">HALL 12</text>
        
        {/* Entry/Exit for Hall 12 */}
        <rect x="375" y="50" width="100" height="30" fill="#6b7280" stroke="#374151" strokeWidth="2" />
        <text x="425" y="70" fontSize="12" fill="white" fontFamily="Arial" textAnchor="middle">ENTRY/EXIT</text>
        
        {/* Aisle A marker */}
        <text x="425" y="550" fontSize="14" fill="#3b82f6" fontFamily="Arial" textAnchor="middle" fontWeight="bold">AISLE 'A'</text>
        
        {/* Aisle B marker */}
        <text x="425" y="700" fontSize="14" fill="#3b82f6" fontFamily="Arial" textAnchor="middle" fontWeight="bold">AISLE 'B'</text>
        
        {/* Aisle C marker */}
        <text x="425" y="850" fontSize="14" fill="#3b82f6" fontFamily="Arial" textAnchor="middle" fontWeight="bold">AISLE 'C'</text>
        
        {/* Aisle L marker */}
        <text x="150" y="1000" fontSize="14" fill="#3b82f6" fontFamily="Arial" textAnchor="middle" fontWeight="bold">AISLE 'L'</text>
        
        {/* F.H.C. marker */}
        <circle cx="425" cy="600" r="8" fill="#64748b" />
        <text x="440" y="605" fontSize="10" fill="#64748b" fontFamily="Arial">F.H.C.</text>
      </g>
      
      {/* Hall 11 Section */}
      <g id="hall-11">
        <rect x="850" y="100" width="750" height="900" fill="rgba(16, 185, 129, 0.1)" stroke="#10b981" strokeWidth="3" />
        <text x="1225" y="80" fontSize="24" fill="#10b981" fontFamily="Arial" textAnchor="middle" fontWeight="bold">HALL 11</text>
        
        {/* Entry/Exit for Hall 11 */}
        <rect x="1175" y="50" width="100" height="30" fill="#6b7280" stroke="#374151" strokeWidth="2" />
        <text x="1225" y="70" fontSize="12" fill="white" fontFamily="Arial" textAnchor="middle">ENTRY/EXIT</text>
        
        {/* Aisle markers */}
        <text x="1225" y="550" fontSize="14" fill="#10b981" fontFamily="Arial" textAnchor="middle" fontWeight="bold">AISLE 'A'</text>
        <text x="1225" y="700" fontSize="14" fill="#10b981" fontFamily="Arial" textAnchor="middle" fontWeight="bold">AISLE 'B'</text>
        <text x="1225" y="850" fontSize="14" fill="#10b981" fontFamily="Arial" textAnchor="middle" fontWeight="bold">AISLE 'C'</text>
        
        {/* F.H.C. marker */}
        <circle cx="1225" cy="600" r="8" fill="#64748b" />
        <text x="1240" y="605" fontSize="10" fill="#64748b" fontFamily="Arial">F.H.C.</text>
      </g>
      
      {/* Hall 10 Section */}
      <g id="hall-10">
        <rect x="1650" y="100" width="750" height="900" fill="rgba(245, 158, 11, 0.1)" stroke="#f59e0b" strokeWidth="3" />
        <text x="2025" y="80" fontSize="24" fill="#f59e0b" fontFamily="Arial" textAnchor="middle" fontWeight="bold">HALL 10</text>
        
        {/* Entry/Exit for Hall 10 */}
        <rect x="1975" y="50" width="100" height="30" fill="#6b7280" stroke="#374151" strokeWidth="2" />
        <text x="2025" y="70" fontSize="12" fill="white" fontFamily="Arial" textAnchor="middle">ENTRY/EXIT</text>
        
        {/* Aisle markers */}
        <text x="2025" y="550" fontSize="14" fill="#f59e0b" fontFamily="Arial" textAnchor="middle" fontWeight="bold">AISLE 'A'</text>
        <text x="2025" y="700" fontSize="14" fill="#f59e0b" fontFamily="Arial" textAnchor="middle" fontWeight="bold">AISLE 'B'</text>
        <text x="2025" y="850" fontSize="14" fill="#f59e0b" fontFamily="Arial" textAnchor="middle" fontWeight="bold">AISLE 'C'</text>
        
        {/* F.H.C. marker */}
        <circle cx="2025" cy="600" r="8" fill="#64748b" />
        <text x="2040" y="605" fontSize="10" fill="#64748b" fontFamily="Arial">F.H.C.</text>
      </g>
      
      {/* Hall 9 Section */}
      <g id="hall-9">
        <rect x="2450" y="100" width="700" height="900" fill="rgba(239, 68, 68, 0.1)" stroke="#ef4444" strokeWidth="3" />
        <text x="2800" y="80" fontSize="24" fill="#ef4444" fontFamily="Arial" textAnchor="middle" fontWeight="bold">HALL 9</text>
        
        {/* Entry/Exit for Hall 9 */}
        <rect x="2750" y="50" width="100" height="30" fill="#6b7280" stroke="#374151" strokeWidth="2" />
        <text x="2800" y="70" fontSize="12" fill="white" fontFamily="Arial" textAnchor="middle">ENTRY/EXIT</text>
        
        {/* Aisle markers */}
        <text x="2800" y="550" fontSize="14" fill="#ef4444" fontFamily="Arial" textAnchor="middle" fontWeight="bold">AISLE 'A'</text>
        <text x="2800" y="700" fontSize="14" fill="#ef4444" fontFamily="Arial" textAnchor="middle" fontWeight="bold">AISLE 'B'</text>
        <text x="2800" y="850" fontSize="14" fill="#ef4444" fontFamily="Arial" textAnchor="middle" fontWeight="bold">AISLE 'C'</text>
        <text x="3100" y="1000" fontSize="14" fill="#ef4444" fontFamily="Arial" textAnchor="middle" fontWeight="bold">AISLE 'J'</text>
        
        {/* F.H.C. marker */}
        <circle cx="2800" cy="600" r="8" fill="#64748b" />
        <text x="2815" y="605" fontSize="10" fill="#64748b" fontFamily="Arial">F.H.C.</text>
      </g>
      
      {/* Walkways/Corridors */}
      <g stroke="#dee2e6" strokeWidth="2" strokeDasharray="10,5" fill="none">
        {/* Horizontal main corridor */}
        <line x1="50" y1="1050" x2="3150" y2="1050" />
        
        {/* Vertical corridors between halls */}
        <line x1="800" y1="100" x2="800" y2="1000" />
        <line x1="1600" y1="100" x2="1600" y2="1000" />
        <line x1="2400" y1="100" x2="2400" y2="1000" />
      </g>
      
      {/* Sample booth rectangles (these will be replaced by dynamic POI rendering) */}
      <g id="sample-booths">
        {/* Hall 12 sample booths */}
        <rect x="350" y="350" width="80" height="50" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="1" />
        <text x="390" y="370" fontSize="10" fill="#3b82f6" fontFamily="Arial" textAnchor="middle">H12A22</text>
        <text x="390" y="385" fontSize="8" fill="#3b82f6" fontFamily="Arial" textAnchor="middle">12x5.5</text>
        
        <rect x="500" y="350" width="120" height="80" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="1" />
        <text x="560" y="385" fontSize="10" fill="#3b82f6" fontFamily="Arial" textAnchor="middle">H12A20</text>
        <text x="560" y="400" fontSize="8" fill="#3b82f6" fontFamily="Arial" textAnchor="middle">22.5x10</text>
        
        {/* Hall 11 sample booths */}
        <rect x="1150" y="350" width="70" height="40" fill="rgba(16, 185, 129, 0.3)" stroke="#10b981" strokeWidth="1" />
        <text x="1185" y="365" fontSize="10" fill="#10b981" fontFamily="Arial" textAnchor="middle">H11A18</text>
        <text x="1185" y="380" fontSize="8" fill="#10b981" fontFamily="Arial" textAnchor="middle">11x5</text>
        
        <rect x="1300" y="350" width="90" height="60" fill="rgba(16, 185, 129, 0.3)" stroke="#10b981" strokeWidth="1" />
        <text x="1345" y="375" fontSize="10" fill="#10b981" fontFamily="Arial" textAnchor="middle">H11A16</text>
        <text x="1345" y="390" fontSize="8" fill="#10b981" fontFamily="Arial" textAnchor="middle">15x9</text>
        
        {/* Hall 10 sample booths */}
        <rect x="1950" y="350" width="50" height="40" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="1" />
        <text x="1975" y="365" fontSize="10" fill="#f59e0b" fontFamily="Arial" textAnchor="middle">H10A12</text>
        
        <rect x="2050" y="350" width="40" height="40" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="1" />
        <text x="2070" y="365" fontSize="10" fill="#f59e0b" fontFamily="Arial" textAnchor="middle">H10A10</text>
        <text x="2070" y="380" fontSize="8" fill="#f59e0b" fontFamily="Arial" textAnchor="middle">6x6</text>
        
        {/* TRUETZSCHLER booth */}
        <rect x="1800" y="750" width="180" height="120" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2" />
        <text x="1890" y="800" fontSize="12" fill="#f59e0b" fontFamily="Arial" textAnchor="middle" fontWeight="bold">TRUETZSCHLER</text>
        <text x="1890" y="815" fontSize="10" fill="#f59e0b" fontFamily="Arial" textAnchor="middle">H10A3</text>
        <text x="1890" y="830" fontSize="8" fill="#f59e0b" fontFamily="Arial" textAnchor="middle">27x18</text>
        
        {/* Hall 9 sample booths */}
        <rect x="2750" y="350" width="120" height="60" fill="rgba(239, 68, 68, 0.3)" stroke="#ef4444" strokeWidth="1" />
        <text x="2810" y="375" fontSize="10" fill="#ef4444" fontFamily="Arial" textAnchor="middle">H9A4</text>
        <text x="2810" y="390" fontSize="8" fill="#ef4444" fontFamily="Arial" textAnchor="middle">18x9</text>
        
        <rect x="2900" y="380" width="90" height="40" fill="rgba(239, 68, 68, 0.3)" stroke="#ef4444" strokeWidth="1" />
        <text x="2945" y="395" fontSize="10" fill="#ef4444" fontFamily="Arial" textAnchor="middle">H9A2</text>
        <text x="2945" y="410" fontSize="8" fill="#ef4444" fontFamily="Arial" textAnchor="middle">14x5+3x2</text>
        
        {/* LMW booth */}
        <rect x="2600" y="750" width="220" height="160" fill="rgba(239, 68, 68, 0.3)" stroke="#ef4444" strokeWidth="2" />
        <text x="2710" y="815" fontSize="12" fill="#ef4444" fontFamily="Arial" textAnchor="middle" fontWeight="bold">LMW</text>
        <text x="2710" y="830" fontSize="10" fill="#ef4444" fontFamily="Arial" textAnchor="middle">H9A1B2</text>
        <text x="2710" y="845" fontSize="8" fill="#ef4444" fontFamily="Arial" textAnchor="middle">32x24</text>
        
        {/* J series booths in Hall 9 */}
        <rect x="3050" y="600" width="40" height="40" fill="rgba(239, 68, 68, 0.3)" stroke="#ef4444" strokeWidth="1" />
        <text x="3070" y="615" fontSize="9" fill="#ef4444" fontFamily="Arial" textAnchor="middle">H9J1</text>
        <text x="3070" y="630" fontSize="7" fill="#ef4444" fontFamily="Arial" textAnchor="middle">6x6</text>
        
        <rect x="3050" y="660" width="40" height="40" fill="rgba(239, 68, 68, 0.3)" stroke="#ef4444" strokeWidth="1" />
        <text x="3070" y="675" fontSize="9" fill="#ef4444" fontFamily="Arial" textAnchor="middle">H9J3</text>
        <text x="3070" y="690" fontSize="7" fill="#ef4444" fontFamily="Arial" textAnchor="middle">6x6</text>
        
        <rect x="3050" y="720" width="40" height="40" fill="rgba(239, 68, 68, 0.3)" stroke="#ef4444" strokeWidth="1" />
        <text x="3070" y="735" fontSize="9" fill="#ef4444" fontFamily="Arial" textAnchor="middle">H9J5</text>
        <text x="3070" y="750" fontSize="7" fill="#ef4444" fontFamily="Arial" textAnchor="middle">6x6</text>
      </g>
      
      {/* Legend */}
      <g id="legend" transform="translate(50, 1400)">
        <rect x="0" y="0" width="400" height="150" fill="white" stroke="#e5e7eb" strokeWidth="1" rx="5" />
        <text x="10" y="20" fontSize="14" fill="#374151" fontFamily="Arial" fontWeight="bold">Exhibition Hall Legend</text>
        
        <rect x="10" y="35" width="15" height="10" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="1" />
        <text x="35" y="45" fontSize="12" fill="#374151" fontFamily="Arial">Hall 12 Booths</text>
        
        <rect x="10" y="55" width="15" height="10" fill="rgba(16, 185, 129, 0.3)" stroke="#10b981" strokeWidth="1" />
        <text x="35" y="65" fontSize="12" fill="#374151" fontFamily="Arial">Hall 11 Booths</text>
        
        <rect x="10" y="75" width="15" height="10" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="1" />
        <text x="35" y="85" fontSize="12" fill="#374151" fontFamily="Arial">Hall 10 Booths</text>
        
        <rect x="10" y="95" width="15" height="10" fill="rgba(239, 68, 68, 0.3)" stroke="#ef4444" strokeWidth="1" />
        <text x="35" y="105" fontSize="12" fill="#374151" fontFamily="Arial">Hall 9 Booths</text>
        
        <circle cx="17" cy="125" r="5" fill="#64748b" />
        <text x="35" y="130" fontSize="12" fill="#374151" fontFamily="Arial">Fire Hose Cabinet (F.H.C.)</text>
        
        <rect x="220" y="35" width="15" height="10" fill="#6b7280" stroke="#374151" strokeWidth="1" />
        <text x="245" y="45" fontSize="12" fill="#374151" fontFamily="Arial">Entrances/Exits</text>
        
        <line x1="220" y1="60" x2="235" y2="60" stroke="#dee2e6" strokeWidth="2" strokeDasharray="5,3" />
        <text x="245" y="65" fontSize="12" fill="#374151" fontFamily="Arial">Walkways/Aisles</text>
      </g>
    </svg>
  );
}