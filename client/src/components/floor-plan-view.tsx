export default function FloorPlanView() {
  return (
    <svg className="w-full h-full" viewBox="0 0 2400 1800" xmlns="http://www.w3.org/2000/svg">
      {/* Floor Plan Background */}
      <rect width="2400" height="1800" fill="#f8f9fa" stroke="#e9ecef" strokeWidth="2" />
      
      {/* Main Building Structure */}
      <rect x="100" y="100" width="2200" height="1600" fill="white" stroke="#495057" strokeWidth="3" />
      
      {/* Interior Walls */}
      
      {/* Main Entrance */}
      <rect x="100" y="850" width="100" height="100" fill="#e9ecef" stroke="#495057" strokeWidth="2" />
      <text x="120" y="870" fontSize="12" fill="#495057" fontFamily="Arial">Main</text>
      <text x="110" y="885" fontSize="12" fill="#495057" fontFamily="Arial">Entrance</text>
      
      {/* Apple Store */}
      <rect x="500" y="200" width="300" height="200" fill="#f8f9fa" stroke="#495057" strokeWidth="2" />
      <text x="600" y="280" fontSize="14" fill="#495057" fontFamily="Arial" textAnchor="middle">Apple Store</text>
      <text x="600" y="300" fontSize="12" fill="#6c757d" fontFamily="Arial" textAnchor="middle">Electronics</text>
      
      {/* Food Court */}
      <rect x="1200" y="600" width="500" height="400" fill="#fff3cd" stroke="#ffc107" strokeWidth="2" />
      <text x="1450" y="780" fontSize="16" fill="#856404" fontFamily="Arial" textAnchor="middle">Food Court</text>
      <text x="1450" y="800" fontSize="12" fill="#856404" fontFamily="Arial" textAnchor="middle">Multiple Dining Options</text>
      
      {/* Food Court Tables */}
      <g fill="#f8f9fa" stroke="#ffc107">
        <circle cx="1300" cy="700" r="25" />
        <circle cx="1400" cy="700" r="25" />
        <circle cx="1500" cy="700" r="25" />
        <circle cx="1600" cy="700" r="25" />
        <circle cx="1300" cy="850" r="25" />
        <circle cx="1400" cy="850" r="25" />
        <circle cx="1500" cy="850" r="25" />
        <circle cx="1600" cy="850" r="25" />
      </g>
      
      {/* H&M Store */}
      <rect x="1600" y="1000" width="400" height="300" fill="#f8f5ff" stroke="#8b5cf6" strokeWidth="2" />
      <text x="1800" y="1140" fontSize="16" fill="#6b46c1" fontFamily="Arial" textAnchor="middle">H&amp;M</text>
      <text x="1800" y="1160" fontSize="12" fill="#6b46c1" fontFamily="Arial" textAnchor="middle">Fashion &amp; Clothing</text>
      
      {/* Restrooms */}
      <rect x="1800" y="300" width="150" height="100" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" />
      <text x="1875" y="340" fontSize="12" fill="#dc2626" fontFamily="Arial" textAnchor="middle">Restrooms</text>
      <text x="1875" y="360" fontSize="10" fill="#dc2626" fontFamily="Arial" textAnchor="middle">Facilities</text>
      
      {/* Additional Stores */}
      <rect x="500" y="500" width="250" height="180" fill="#dcfce7" stroke="#22c55e" strokeWidth="2" />
      <text x="625" y="580" fontSize="12" fill="#16a34a" fontFamily="Arial" textAnchor="middle">Electronics</text>
      <text x="625" y="600" fontSize="12" fill="#16a34a" fontFamily="Arial" textAnchor="middle">Zone</text>
      
      <rect x="500" y="800" width="250" height="180" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" />
      <text x="625" y="880" fontSize="12" fill="#2563eb" fontFamily="Arial" textAnchor="middle">Services</text>
      <text x="625" y="900" fontSize="12" fill="#2563eb" fontFamily="Arial" textAnchor="middle">Center</text>
      
      <rect x="900" y="200" width="200" height="150" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
      <text x="1000" y="270" fontSize="12" fill="#d97706" fontFamily="Arial" textAnchor="middle">Cafe</text>
      
      <rect x="900" y="400" width="200" height="150" fill="#f3e8ff" stroke="#8b5cf6" strokeWidth="2" />
      <text x="1000" y="470" fontSize="12" fill="#7c3aed" fontFamily="Arial" textAnchor="middle">Fashion</text>
      
      {/* Corridors/Walkways */}
      <rect x="300" y="400" width="100" height="800" fill="none" stroke="#dee2e6" strokeWidth="1" strokeDasharray="5,5" />
      <rect x="800" y="400" width="100" height="800" fill="none" stroke="#dee2e6" strokeWidth="1" strokeDasharray="5,5" />
      <rect x="1100" y="400" width="100" height="800" fill="none" stroke="#dee2e6" strokeWidth="1" strokeDasharray="5,5" />
      
      {/* Main Central Walkway */}
      <rect x="300" y="800" width="1300" height="100" fill="none" stroke="#dee2e6" strokeWidth="2" strokeDasharray="10,5" />
      
      {/* Directory Signs */}
      <g fill="#6c757d" fontSize="10" fontFamily="Arial">
        <rect x="350" y="750" width="60" height="30" fill="#e9ecef" stroke="#6c757d" />
        <text x="380" y="770" textAnchor="middle">Directory</text>
        
        <rect x="1050" y="750" width="60" height="30" fill="#e9ecef" stroke="#6c757d" />
        <text x="1080" y="770" textAnchor="middle">You Are</text>
        <text x="1080" y="780" textAnchor="middle">Here</text>
      </g>
      
      {/* Emergency Exits */}
      <g fill="#dc2626" fontSize="8" fontFamily="Arial">
        <rect x="100" y="400" width="50" height="20" fill="#fee2e2" stroke="#dc2626" />
        <text x="125" y="413" textAnchor="middle">EXIT</text>
        
        <rect x="2250" y="400" width="50" height="20" fill="#fee2e2" stroke="#dc2626" />
        <text x="2275" y="413" textAnchor="middle">EXIT</text>
        
        <rect x="1150" y="1750" width="50" height="20" fill="#fee2e2" stroke="#dc2626" />
        <text x="1175" y="1763" textAnchor="middle">EXIT</text>
      </g>
      
      {/* Parking Areas (outside) */}
      <g fill="none" stroke="#6c757d" strokeWidth="1">
        <rect x="50" y="50" width="50" height="1700" strokeDasharray="3,3" />
        <rect x="2300" y="50" width="50" height="1700" strokeDasharray="3,3" />
        <text x="75" y="900" fontSize="10" fill="#6c757d" fontFamily="Arial" transform="rotate(-90 75 900)">PARKING</text>
        <text x="2325" y="900" fontSize="10" fill="#6c757d" fontFamily="Arial" transform="rotate(90 2325 900)">PARKING</text>
      </g>
    </svg>
  );
}