export default function StatCard({ title, value, change, icon }) {
  const isPositive = change >= 0;
  const changeColor = title === '위험 이벤트'
    ? (isPositive ? 'text-red-400' : 'text-green-400')
    : (isPositive ? 'text-green-400' : 'text-red-400');

  return (
    <div className="bg-dark-card border border-dark-border rounded-xl p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-gray-400">{title}</span>
        {icon && <span className="text-gray-500">{icon}</span>}
      </div>
      <div className="text-2xl font-bold text-white mb-1">
        {typeof value === 'number' ? value.toLocaleString() : value}
      </div>
      <div className={`text-sm ${changeColor}`}>
        {isPositive ? '+' : ''}{change}% 전일 대비
      </div>
    </div>
  );
}
