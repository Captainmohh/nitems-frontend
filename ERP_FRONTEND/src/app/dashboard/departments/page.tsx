"use client";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Pencil, Trash2, Users, UserPlus } from "lucide-react";
import toast from "react-hot-toast";
import { departmentApi, userApi } from "@/lib/api";
import { TopBar } from "@/components/layout/TopBar";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { Badge } from "@/components/ui/Badge";

interface Department {
  id: string;
  name: string;
  slug: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  _count?: { staff: number };
}

export default function DepartmentsPage() {
  const qc = useQueryClient();
  const [createOpen, setCreateOpen] = useState(false);
  const [editDept, setEditDept] = useState<Department | null>(null);
  const [staffDept, setStaffDept] = useState<Department | null>(null);
  const [form, setForm] = useState({ name: "", description: "" });
  const [staffUserId, setStaffUserId] = useState("");

  const { data, isLoading } = useQuery<{ data: Department[]; meta: unknown }>({
    queryKey: ["departments"],
    queryFn: () => departmentApi.findAll({ limit: 100 }),
  });

  const { data: staffData } = useQuery({
    queryKey: ["department-staff", staffDept?.id],
    queryFn: () => departmentApi.listStaff(staffDept!.id),
    enabled: !!staffDept,
  });

  const { data: usersData } = useQuery({
    queryKey: ["users-all", "EMPLOYEE"],
    queryFn: () => userApi.findAll({ limit: 100, role: "EMPLOYEE" }),
    enabled: !!staffDept,
    staleTime: 0,
  });

  const createMutation = useMutation({
    mutationFn: () => departmentApi.create(form),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["departments"] });
      toast.success("Department created");
      setCreateOpen(false);
      setForm({ name: "", description: "" });
    },
    onError: () => toast.error("Failed to create department"),
  });

  const updateMutation = useMutation({
    mutationFn: () => departmentApi.update(editDept!.id, form),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["departments"] });
      toast.success("Department updated");
      setEditDept(null);
    },
    onError: () => toast.error("Failed to update department"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => departmentApi.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["departments"] });
      toast.success("Department deleted");
    },
    onError: () => toast.error("Failed to delete department"),
  });

  const assignStaffMutation = useMutation({
    mutationFn: () =>
      departmentApi.assignStaff(staffDept!.id, staffUserId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["department-staff", staffDept?.id] });
      toast.success("Staff assigned");
      setStaffUserId("");
    },
    onError: () => toast.error("Failed to assign staff"),
  });

  const removeStaffMutation = useMutation({
    mutationFn: (userId: string) =>
      departmentApi.removeStaff(staffDept!.id, userId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["department-staff", staffDept?.id] });
      toast.success("Staff removed");
    },
    onError: () => toast.error("Failed to remove staff"),
  });

  const departments: Department[] = data?.data ?? [];

  const openEdit = (dept: Department) => {
    setEditDept(dept);
    setForm({ name: dept.name, description: dept.description ?? "" });
  };

  return (
    <div className="min-h-full">
      <TopBar title="Departments" subtitle="Manage training departments" />
      <div className="p-6">
        {/* Header row */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500">{departments.length} department(s)</p>
          <Button onClick={() => { setForm({ name: "", description: "" }); setCreateOpen(true); }}>
            <Plus className="w-4 h-4" /> New Department
          </Button>
        </div>

        {isLoading && (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-[#1C4B40] border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Departments grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {departments.map((dept) => (
            <Card key={dept.id} className="flex flex-col gap-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">{dept.name}</h3>
                  <p className="text-xs text-gray-400 font-mono mt-0.5">{dept.slug}</p>
                </div>
                <Badge variant={dept.isActive ? "success" : "muted"}>
                  {dept.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
              {dept.description && (
                <p className="text-xs text-gray-500">{dept.description}</p>
              )}
              <div className="flex items-center gap-3 text-xs text-gray-400">
                {dept._count && (
                  <span>{dept._count.staff} staff</span>
                )}
              </div>
              <div className="flex items-center gap-2 pt-1 border-t border-gray-200">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setStaffDept(dept)}
                  className="flex-1 justify-center"
                >
                  <Users className="w-3.5 h-3.5" /> Staff
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => openEdit(dept)}
                  className="flex-1 justify-center"
                >
                  <Pencil className="w-3.5 h-3.5" /> Edit
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => {
                    if (confirm(`Delete "${dept.name}"?`))
                      deleteMutation.mutate(dept.id);
                  }}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {!isLoading && departments.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-sm">No departments yet</p>
            <Button className="mt-4" onClick={() => setCreateOpen(true)}>
              <Plus className="w-4 h-4" /> Create First Department
            </Button>
          </div>
        )}
      </div>

      {/* Create Modal */}
      <Modal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        title="New Department"
        size="sm"
      >
        <div className="space-y-4">
          <Input
            label="Department Name"
            placeholder="e.g. Cybersecurity"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          />
          <Input
            label="Description (optional)"
            placeholder="Brief description"
            value={form.description}
            onChange={(e) =>
              setForm((f) => ({ ...f, description: e.target.value }))
            }
          />
          <div className="flex gap-3 pt-2">
            <Button
              variant="secondary"
              className="flex-1"
              onClick={() => setCreateOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="flex-1"
              loading={createMutation.isPending}
              onClick={() => createMutation.mutate()}
              disabled={!form.name.trim()}
            >
              Create
            </Button>
          </div>
        </div>
      </Modal>

      {/* Edit Modal */}
      <Modal
        open={!!editDept}
        onClose={() => setEditDept(null)}
        title="Edit Department"
        size="sm"
      >
        <div className="space-y-4">
          <Input
            label="Department Name"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          />
          <Input
            label="Description"
            value={form.description}
            onChange={(e) =>
              setForm((f) => ({ ...f, description: e.target.value }))
            }
          />
          <div className="flex gap-3 pt-2">
            <Button
              variant="secondary"
              className="flex-1"
              onClick={() => setEditDept(null)}
            >
              Cancel
            </Button>
            <Button
              className="flex-1"
              loading={updateMutation.isPending}
              onClick={() => updateMutation.mutate()}
            >
              Save
            </Button>
          </div>
        </div>
      </Modal>

      {/* Staff Management Modal */}
      <Modal
        open={!!staffDept}
        onClose={() => setStaffDept(null)}
        title={`Staff — ${staffDept?.name}`}
        size="md"
      >
        <div className="space-y-4">
          {/* Assign staff */}
          <div className="flex gap-2">
            <select
              className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#1C4B40]"
              value={staffUserId}
              onChange={(e) => setStaffUserId(e.target.value)}
            >
              <option value="">Select a user to assign</option>
              {(usersData?.data ?? []).map(
                (u: { id: string; firstName: string; lastName: string; email: string }) => (
                  <option key={u.id} value={u.id}>
                    {u.firstName} {u.lastName} ({u.email})
                  </option>
                )
              )}
            </select>
            <Button
              loading={assignStaffMutation.isPending}
              disabled={!staffUserId}
              onClick={() => assignStaffMutation.mutate()}
            >
              <UserPlus className="w-4 h-4" />
            </Button>
          </div>

          {/* Current staff list */}
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {(staffData ?? []).length === 0 && (
              <p className="text-sm text-gray-500 text-center py-4">
                No staff assigned
              </p>
            )}
            {(staffData ?? []).map(
              (s: {
                userId: string;
                user: { firstName: string; lastName: string; email: string };
              }) => (
                <div
                  key={s.userId}
                  className="flex items-center justify-between px-3 py-2 bg-gray-50 rounded-xl border border-gray-200"
                >
                  <div>
                    <p className="text-sm text-gray-900">
                      {s.user.firstName} {s.user.lastName}
                    </p>
                    <p className="text-xs text-gray-500">{s.user.email}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => removeStaffMutation.mutate(s.userId)}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              )
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
}
