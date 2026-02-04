'use client';

import { useEffect, useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import StatCard from '@/components/StatCard';
import {
  getDashboardStats,
  getTrafficData,
  getRecentEvents,
} from '@/lib/api';

const severityColors = {
  CRITICAL: 'bg-severity-critical/20 text-severity-critical',
  HIGH: 'bg-severity-high/20 text-severity-high',
  MEDIUM: 'bg-severity-medium/20 text-severity-medium',
  LOW: 'bg-severity-low/20 text-severity-low',
  INFO: 'bg-severity-info/20 text-severity-info',
};

const actionColors = {
  DENY: 'text-action-deny',
  ALLOW: 'text-action-allow',
  DROP: 'text-action-drop',
};

export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [traffic, setTraffic] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [statsData, trafficData, eventsData] = await Promise.all([
          getDashboardStats(),
          getTrafficData(),
          getRecentEvents(),
        ]);
        setStats(statsData);
        setTraffic(trafficData);
        setEvents(eventsData);
      } catch (err) {
        console.error('데이터 로드 실패:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-400">데이터를 불러오는 중...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats && (
          <>
            <StatCard
              title={stats.totalLogs.label}
              value={stats.totalLogs.value}
              change={stats.totalLogs.change}
            />
            <StatCard
              title={stats.blocked.label}
              value={stats.blocked.value}
              change={stats.blocked.change}
            />
            <StatCard
              title={stats.allowed.label}
              value={stats.allowed.value}
              change={stats.allowed.change}
            />
            <StatCard
              title={stats.critical.label}
              value={stats.critical.value}
              change={stats.critical.change}
            />
          </>
        )}
      </div>

      {/* 트래픽 차트 */}
      <div className="bg-dark-card border border-dark-border rounded-xl p-5">
        <h3 className="text-lg font-semibold text-white mb-4">
          24시간 트래픽 현황
        </h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={traffic}>
              <defs>
                <linearGradient id="allowedGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="blockedGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2d3e" />
              <XAxis dataKey="time" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1a1d2e',
                  border: '1px solid #2a2d3e',
                  borderRadius: '8px',
                  color: '#e2e8f0',
                }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="allowed"
                name="허용"
                stroke="#22c55e"
                fill="url(#allowedGradient)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="blocked"
                name="차단"
                stroke="#ef4444"
                fill="url(#blockedGradient)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 최근 이벤트 */}
      <div className="bg-dark-card border border-dark-border rounded-xl p-5">
        <h3 className="text-lg font-semibold text-white mb-4">
          최근 보안 이벤트
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-400 border-b border-dark-border">
                <th className="text-left py-3 px-3 font-medium">시간</th>
                <th className="text-left py-3 px-3 font-medium">출발지 IP</th>
                <th className="text-left py-3 px-3 font-medium">목적지 IP</th>
                <th className="text-left py-3 px-3 font-medium">포트</th>
                <th className="text-left py-3 px-3 font-medium">액션</th>
                <th className="text-left py-3 px-3 font-medium">심각도</th>
                <th className="text-left py-3 px-3 font-medium">설명</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr
                  key={event.id}
                  className="border-b border-dark-border/50 hover:bg-dark-hover transition"
                >
                  <td className="py-3 px-3 text-gray-300 whitespace-nowrap">
                    {event.timestamp}
                  </td>
                  <td className="py-3 px-3 text-gray-300 font-mono">
                    {event.sourceIp}
                  </td>
                  <td className="py-3 px-3 text-gray-300 font-mono">
                    {event.destIp}
                  </td>
                  <td className="py-3 px-3 text-gray-300">
                    {event.port}
                  </td>
                  <td className="py-3 px-3">
                    <span className={`font-medium ${actionColors[event.action] || 'text-gray-300'}`}>
                      {event.action}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${severityColors[event.severity] || ''}`}>
                      {event.severity}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-gray-300">
                    {event.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
