"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Shield, Search, RefreshCw, ChevronDown, ChevronUp } from "lucide-react";
import { auditApi } from "@/lib/api";
import { TopBar } from "@/components/layout/TopBar";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";

interface AuditLog {
  id: string;
  action: string;
  url: string;
  resourceType?: string;
  resourceId?: string;
  ipAddress?: string;
  changes?: Record<string, any>;
  timestamp: string;
  user?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  };
}

const actionVariant: Record<string, "success" | "danger" | "warning" | "info" | "muted"> = {
  Create: "success",
  Delete: "danger",
  Update: "warning",
  View:   "info",
  Read:   "info",
  "Sign in":  "muted",
  "Sign Up":  "muted",
  Unknown: "muted",
};

const RESOURCE_TYPES = [
  "", "Auth", "Users", "Departments", "Analytics", "Audit",
];

export default function AuditLogPage() {
  const [page, setPage]               = useState(1);
  const [search, setSearch]           = useState("");
  const [resourceType, setResourceType] = useState("");
  const [from, setFrom]               = useState("");
  const [to, setTo]                   = useState("");
  const [expanded, setExpanded]       = useState<string | null>(null);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["audit", page, search, resourceType, from, to],
    queryFn: () =>
      auditApi.findAll({
        page,
        limit: 20,
        order: "desc",
        ...(search       ? { search }       : {}),
        ...(resourceType ? { resourceType }  : {}),
        ...(from         ? { createdAfter: from }  : {}),
        ...(to           ? { createdBefore: to }   : {}),
      }),
  });

  const logs: AuditLog[] = data?.data ?? [];
  const meta = data?.meta;

  return (
    <div className="min-h-full">
      <TopBar title="Audit Trail" subtitle="Every action performed on the system" />
      <div className="p-6 space-y-4">

        {/* Filters */}
        <Card>
          <div className="flex flex-wrap items-end gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search actions..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                className="pl-9 w-48"
              />
            </div>

            <select
              className="bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#1C4B40]"
              value={resourceType}
              onChange={(e) => { setResourceType(e.target.value); setPage(1); }}
            >
              <option value="">All resources</option>
              {RESOURCE_TYPES.filter(Boolean).map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>

            <div className="flex items-center gap-2">
              <input
                type="date"
                className="bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#1C4B40]"
                value={from}
                onChange={(e) => { setFrom(e.target.value); setPage(1); }}
              />
              <span className="text-gray-400 text-sm">to</span>
              <input
                type="date"
                className="bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#1C4B40]"
                value={to}
                onChange={(e) => { setTo(e.target.value); setPage(1); }}
              />
            </div>

            <Button size="sm" variant="ghost" onClick={() => refetch()}>
              <RefreshCw className="w-3.5 h-3.5" /> Refresh
            </Button>

            {(search || resourceType || from || to) && (
              <Button size="sm" variant="secondary" onClick={() => {
                setSearch(""); setResourceType(""); setFrom(""); setTo(""); setPage(1);
              }}>
                Clear filters
              </Button>
            )}

            <span className="ml-auto text-sm text-gray-500">{meta?.total ?? 0} entries</span>
          </div>
        </Card>

        {/* Table */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-[#1C4B40] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <Card padding={false}>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-left">
                  <th className="px-4 py-3 font-medium text-gray-500">User</th>
                  <th className="px-4 py-3 font-medium text-gray-500">Action</th>
                  <th className="px-4 py-3 font-medium text-gray-500">Resource</th>
                  <th className="px-4 py-3 font-medium text-gray-500">Endpoint</th>
                  <th className="px-4 py-3 font-medium text-gray-500">IP</th>
                  <th className="px-4 py-3 font-medium text-gray-500">Time</th>
                  <th className="px-4 py-3 font-medium text-gray-500"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {logs.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-16 text-center text-gray-500">
                      <Shield className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                      No audit entries found
                    </td>
                  </tr>
                )}
                {logs.map((log) => (
                  <>
                    <tr
                      key={log.id}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => setExpanded(expanded === log.id ? null : log.id)}
                    >
                      <td className="px-4 py-3">
                        {log.user ? (
                          <div>
                            <p className="font-medium text-gray-900 text-xs">
                              {log.user.firstName} {log.user.lastName}
                            </p>
                            <p className="text-gray-400 text-xs">{log.user.email}</p>
                            <p className="text-[10px] text-gray-400 capitalize">{log.user.role}</p>
                          </div>
                        ) : (
                          <span className="text-gray-400 text-xs">System</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant={actionVariant[log.action] ?? "muted"}>
                          {log.action}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-gray-600 text-xs">{log.resourceType ?? "—"}</td>
                      <td className="px-4 py-3 text-gray-400 text-xs font-mono max-w-48 truncate">
                        {log.url}
                      </td>
                      <td className="px-4 py-3 text-gray-400 text-xs font-mono">
                        {log.ipAddress ?? "—"}
                      </td>
                      <td className="px-4 py-3 text-gray-500 text-xs whitespace-nowrap">
                        {format(new Date(log.timestamp), "dd MMM yyyy HH:mm:ss")}
                      </td>
                      <td className="px-4 py-3 text-gray-400">
                        {expanded === log.id
                          ? <ChevronUp className="w-3.5 h-3.5" />
                          : <ChevronDown className="w-3.5 h-3.5" />}
                      </td>
                    </tr>

                    {/* Expanded detail row */}
                    {expanded === log.id && (
                      <tr key={`${log.id}-detail`} className="bg-gray-50">
                        <td colSpan={7} className="px-6 py-3">
                          <pre className="text-xs text-gray-700 font-mono bg-white border border-gray-200 rounded-lg p-3 overflow-x-auto whitespace-pre-wrap max-h-48">
                            {JSON.stringify(log.changes, null, 2)}
                          </pre>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>

            {meta && meta.total > 20 && (
              <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500">
                <span>{meta.total} total entries</span>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="ghost" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Prev</Button>
                  <span>{page} / {Math.ceil(meta.total / 20)}</span>
                  <Button size="sm" variant="ghost" disabled={page >= Math.ceil(meta.total / 20)} onClick={() => setPage((p) => p + 1)}>Next</Button>
                </div>
              </div>
            )}
          </Card>
        )}
      </div>
    </div>
  );
}
