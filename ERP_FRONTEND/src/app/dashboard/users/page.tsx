"use client";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, ShieldOff, ShieldCheck, Trash2, Building2, UserCheck, KeyRound } from "lucide-react";
import toast from "react-hot-toast";
import { userApi, departmentApi } from "@/lib/api";
import { TopBar } from "@/components/layout/TopBar";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { Badge } from "@/components/ui/Badge";

type Role = "ADMIN" | "HR" | "EMPLOYEE";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  isVerified: boolean;
  isBanned: boolean;
  createdAt: string;
  departmentStaff?: Array<{ department: { id: string; name: string } }>;
}

interface Department {
  id: string;
  name: string;
}

const roleColor: Record<Role, "success" | "warning" | "info" | "muted"> = {
  ADMIN:    "warning",
  HR:       "info",
  EMPLOYEE: "success",
};

const DEPT_ROLES: Role[] = ["EMPLOYEE", "HR"];

export default function UsersPage() {
  const qc = useQueryClient();
  const [search, setSearch]       = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [page, setPage]           = useState(1);
  const [createOpen, setCreateOpen] = useState(false);
  const [resetTarget, setResetTarget] = useState<User | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "EMPLOYEE" as Role,
    departmentId: "",
  });

  const { data, isLoading } = useQuery({
    queryKey: ["users", page, search, roleFilter],
    queryFn: () =>
      userApi.findAll({
        page,
        limit: 20,
        ...(search     ? { search }         : {}),
        ...(roleFilter ? { role: roleFilter } : {}),
      }),
  });

  // Load departments for the dropdown — only when modal is open
  const { data: deptData } = useQuery({
    queryKey: ["departments-all"],
    queryFn: () => departmentApi.findAll({ limit: 100 }),
    enabled: createOpen,
  });
  const departments: Department[] = Array.isArray(deptData)
    ? deptData
    : (deptData?.data ?? []);

  const createMutation = useMutation({
    mutationFn: () =>
      userApi.create({
        firstName:    form.firstName,
        lastName:     form.lastName,
        email:        form.email,
        password:     form.password,
        role:         form.role,
        ...(form.departmentId ? { departmentId: form.departmentId } : {}),
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["users"] });
      toast.success("User created");
      setCreateOpen(false);
      resetForm();
    },
    onError: (err: any) => {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.errors?.[0] ||
        "Failed to create user";
      toast.error(Array.isArray(msg) ? msg[0] : msg);
    },
  });

  const banMutation = useMutation({
    mutationFn: (id: string) => userApi.ban(id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["users"] }); toast.success("User banned"); },
    onError: () => toast.error("Failed to ban user"),
  });

  const unbanMutation = useMutation({
    mutationFn: (id: string) => userApi.unban(id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["users"] }); toast.success("User unbanned"); },
    onError: () => toast.error("Failed to unban user"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => userApi.delete(id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["users"] }); toast.success("User deleted"); },
    onError: () => toast.error("Failed to delete user"),
  });

  const verifyMutation = useMutation({
    mutationFn: (id: string) => userApi.verify(id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["users"] }); toast.success("User verified"); },
    onError: () => toast.error("Failed to verify user"),
  });

  const resetPasswordMutation = useMutation({
    mutationFn: ({ id, password }: { id: string; password: string }) =>
      userApi.adminResetPassword(id, password),
    onSuccess: () => {
      toast.success("Password reset successfully");
      setResetTarget(null);
      setNewPassword("");
    },
    onError: () => toast.error("Failed to reset password"),
  });

  const resetForm = () =>
    setForm({ firstName: "", lastName: "", email: "", password: "", role: "EMPLOYEE", departmentId: "" });

  const users: User[] = data?.data ?? [];
  const meta = data?.meta;
  const needsDept = DEPT_ROLES.includes(form.role as Role);

  return (
    <div className="min-h-full">
      <TopBar title="Employees" subtitle="Manage staff records" />
      <div className="p-6">
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <Input
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-64"
          />
          <select
            className="bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#1C4B40]"
            value={roleFilter}
            onChange={(e) => { setRoleFilter(e.target.value); setPage(1); }}
          >
            <option value="">All roles</option>
            <option value="ADMIN">Admin</option>
            <option value="HR">HR</option>
            <option value="EMPLOYEE">Employee</option>
          </select>
          <div className="ml-auto">
            <Button onClick={() => { resetForm(); setCreateOpen(true); }}>
              <Plus className="w-4 h-4" /> New Employee
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-[#1C4B40] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <Card padding={false}>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-left">
                  <th className="px-4 py-3 font-medium text-gray-500">Name</th>
                  <th className="px-4 py-3 font-medium text-gray-500">Email</th>
                  <th className="px-4 py-3 font-medium text-gray-500">Role</th>
                  <th className="px-4 py-3 font-medium text-gray-500">Department</th>
                  <th className="px-4 py-3 font-medium text-gray-500">Status</th>
                  <th className="px-4 py-3 font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-12 text-center text-gray-500">
                      No users found
                    </td>
                  </tr>
                )}
                {users.map((u) => {
                  const dept = u.departmentStaff?.[0]?.department;
                  return (
                    <tr key={u.id} className="hover:bg-gray-100/50">
                      <td className="px-4 py-3 font-medium text-gray-900">
                        {u.firstName} {u.lastName}
                      </td>
                      <td className="px-4 py-3 text-gray-500">{u.email}</td>
                      <td className="px-4 py-3">
                        <Badge variant={roleColor[u.role]}>{u.role}</Badge>
                      </td>
                      <td className="px-4 py-3">
                        {dept ? (
                          <span className="flex items-center gap-1.5 text-xs text-gray-600">
                            <Building2 className="w-3.5 h-3.5 text-gray-400" />
                            {dept.name}
                          </span>
                        ) : (
                          <span className="text-xs text-gray-300">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-col gap-1">
                          <Badge variant={u.isBanned ? "danger" : "success"}>
                            {u.isBanned ? "Banned" : "Active"}
                          </Badge>
                          {!u.isVerified && (
                            <Badge variant="warning">Unverified</Badge>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          {!u.isVerified && (
                            <Button
                              size="sm"
                              variant="ghost"
                              title="Verify account"
                              onClick={() => verifyMutation.mutate(u.id)}
                            >
                              <UserCheck className="w-3.5 h-3.5 text-blue-500" />
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="ghost"
                            title="Reset password"
                            onClick={() => { setResetTarget(u); setNewPassword(""); }}
                          >
                            <KeyRound className="w-3.5 h-3.5 text-violet-500" />
                          </Button>
                          {u.isBanned ? (
                            <Button size="sm" variant="ghost" onClick={() => unbanMutation.mutate(u.id)}>
                              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                            </Button>
                          ) : (
                            <Button size="sm" variant="ghost" onClick={() => banMutation.mutate(u.id)}>
                              <ShieldOff className="w-3.5 h-3.5 text-amber-500" />
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="danger"
                            onClick={() => { if (confirm(`Delete ${u.email}?`)) deleteMutation.mutate(u.id); }}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {meta && (
              <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500">
                <span>{meta.total} user{meta.total !== 1 ? "s" : ""}</span>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="ghost" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Prev</Button>
                  <span>{page} / {Math.ceil(meta.total / 20) || 1}</span>
                  <Button size="sm" variant="ghost" disabled={page >= Math.ceil(meta.total / 20)} onClick={() => setPage((p) => p + 1)}>Next</Button>
                </div>
              </div>
            )}
          </Card>
        )}
      </div>

      {/* Create Modal */}
      <Modal open={createOpen} onClose={() => setCreateOpen(false)} title="New Employee" size="sm">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="First Name"
              value={form.firstName}
              onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
            />
            <Input
              label="Last Name"
              value={form.lastName}
              onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))}
            />
          </div>
          <Input
            label="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          />
          <div>
            <Input
              label="Password"
              type="password"
              placeholder="e.g. Nitda@2025"
              value={form.password}
              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
            />
            <p className="text-xs text-gray-400 mt-1">Min 6 chars, must include a letter and a number or symbol. No spaces.</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Role</label>
            <select
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#1C4B40]"
              value={form.role}
              onChange={(e) => setForm((f) => ({ ...f, role: e.target.value as Role, departmentId: "" }))}
            >
              <option value="EMPLOYEE">Employee</option>
              <option value="HR">HR</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          {/* Department — only shown for EMPLOYEE / HR */}
          {needsDept && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Department <span className="text-gray-400 text-xs font-normal">(optional)</span>
              </label>
              <select
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#1C4B40]"
                value={form.departmentId}
                onChange={(e) => setForm((f) => ({ ...f, departmentId: e.target.value }))}
              >
                <option value="">Select department...</option>
                {departments.map((d) => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <Button variant="secondary" className="flex-1" onClick={() => setCreateOpen(false)}>
              Cancel
            </Button>
            <Button
              className="flex-1"
              loading={createMutation.isPending}
              onClick={() => createMutation.mutate()}
              disabled={
                !form.email || !form.password || !form.firstName
              }
            >
              Create
            </Button>
          </div>
        </div>
      </Modal>

      {/* Reset Password Modal */}
      <Modal
        open={!!resetTarget}
        onClose={() => setResetTarget(null)}
        title="Reset Password"
        size="sm"
      >
        {resetTarget && (
          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              Set a new password for <strong>{resetTarget.firstName} {resetTarget.lastName}</strong> ({resetTarget.email}).
            </p>
            <Input
              label="New Password"
              type="password"
              placeholder="Min. 6 characters"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              autoFocus
            />
            <div className="flex gap-3 pt-2">
              <Button variant="secondary" className="flex-1" onClick={() => setResetTarget(null)}>
                Cancel
              </Button>
              <Button
                className="flex-1"
                loading={resetPasswordMutation.isPending}
                disabled={newPassword.length < 6}
                onClick={() => resetPasswordMutation.mutate({ id: resetTarget.id, password: newPassword })}
              >
                Reset Password
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
