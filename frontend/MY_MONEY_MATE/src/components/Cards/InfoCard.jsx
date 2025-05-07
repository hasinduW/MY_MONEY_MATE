const InfoCard = ({ icon, label, value, color }) => {
    return (
      <div className={`p-4 rounded-xl shadow-md text-white ${color}`}>
        <div className="text-3xl mb-2">{icon}</div>
        <div className="text-sm">{label}</div>
        <div className="text-xl font-bold">{value}</div>
      </div>
    );
  };
  
  export default InfoCard; 
  