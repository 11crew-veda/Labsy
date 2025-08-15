import React, { useState, useContext, createContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// UI Components
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { Badge } from './components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from './components/ui/avatar';
import { Progress } from './components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './components/ui/table';

// Icons
import { 
  Bell, 
  User, 
  Settings, 
  LogOut, 
  Search, 
  Plus, 
  Eye, 
  Check, 
  X, 
  Upload, 
  Download, 
  QrCode,
  Activity,
  Users,
  FileText,
  Shield,
  Calendar,
  Clock,
  TestTube,
  Stethoscope,
  UserCheck,
  Building2,
  Microscope,
  ClipboardCheck
} from 'lucide-react';

// Auth Context
const AuthContext = createContext();

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock Data
const mockUsers = {
  'admin@hospital.com': { role: 'Hospital Admin', name: 'Dr. Sarah Johnson' },
  'nurse@hospital.com': { role: 'Nurse', name: 'Maria Garcia' },
  'doctor@hospital.com': { role: 'Doctor', name: 'Dr. Michael Chen' },
  'patient@example.com': { role: 'Patient', name: 'John Smith' },
  'lab@hospital.com': { role: 'Lab Scientist', name: 'Dr. Emily Davis' },
  'supervisor@pharma.com': { role: 'Supervisor', name: 'Robert Wilson' }
};

const mockTrials = [
  { id: 'TRL-001', name: 'COVID-19 Vaccine Phase III', patients: 245, status: 'Active' },
  { id: 'TRL-002', name: 'Diabetes Drug Trial', patients: 128, status: 'Active' },
  { id: 'TRL-003', name: 'Heart Disease Prevention', patients: 89, status: 'Recruiting' }
];

const mockPatients = [
  { id: 'P-001', name: 'Alice Johnson', trial: 'TRL-001', status: 'Active', lastVisit: '2024-01-15' },
  { id: 'P-002', name: 'Bob Williams', trial: 'TRL-002', status: 'Pending', lastVisit: '2024-01-12' },
  { id: 'P-003', name: 'Carol Brown', trial: 'TRL-001', status: 'Completed', lastVisit: '2024-01-10' }
];

// Components
const Header = () => {
  const { user, logout } = useAuth();
  
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <TestTube className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Labsy</h1>
          </div>
          <Badge variant="outline" className="text-sm">
            {user?.role}
          </Badge>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="sm" onClick={logout}>
            <LogOut className="h-5 w-5" />
          </Button>
          <Avatar>
            <AvatarFallback>{user?.name?.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

const Sidebar = () => {
  const { user } = useAuth();
  
  const menuItems = {
    'Hospital Admin': [
      { icon: Activity, label: 'Dashboard', path: '/dashboard' },
      { icon: Users, label: 'Users', path: '/users' },
      { icon: FileText, label: 'Trials', path: '/trials' },
      { icon: TestTube, label: 'Blood Tests', path: '/tests' },
      { icon: QrCode, label: 'QR Codes', path: '/qr' },
      { icon: FileText, label: 'Reports', path: '/reports' },
      { icon: Settings, label: 'Settings', path: '/settings' }
    ],
    'Doctor': [
      { icon: Activity, label: 'Dashboard', path: '/dashboard' },
      { icon: Users, label: 'Patients', path: '/patients' },
      { icon: TestTube, label: 'Blood Tests', path: '/tests' },
      { icon: FileText, label: 'Reports', path: '/reports' },
      { icon: Shield, label: 'Verification', path: '/verification' }
    ],
    'Nurse': [
      { icon: Activity, label: 'Dashboard', path: '/dashboard' },
      { icon: ClipboardCheck, label: 'Tasks', path: '/tasks' },
      { icon: QrCode, label: 'QR Scanner', path: '/scanner' },
      { icon: Users, label: 'Patients', path: '/patients' }
    ],
    'Patient': [
      { icon: Activity, label: 'Dashboard', path: '/dashboard' },
      { icon: Calendar, label: 'Appointments', path: '/appointments' },
      { icon: FileText, label: 'Consent Forms', path: '/consent' },
      { icon: TestTube, label: 'Test Results', path: '/results' }
    ],
    'Lab Scientist': [
      { icon: Activity, label: 'Dashboard', path: '/dashboard' },
      { icon: TestTube, label: 'Test Requests', path: '/test-requests' },
      { icon: Upload, label: 'Upload Results', path: '/upload' },
      { icon: FileText, label: 'Reports', path: '/reports' }
    ],
    'Supervisor': [
      { icon: Activity, label: 'Dashboard', path: '/dashboard' },
      { icon: FileText, label: 'Reports', path: '/reports' },
      { icon: Shield, label: 'Verification', path: '/verification' },
      { icon: Check, label: 'Approvals', path: '/approvals' }
    ]
  };

  const items = menuItems[user?.role] || [];

  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 px-4 py-6">
      <nav className="space-y-2">
        {items.map((item, index) => (
          <Button
            key={index}
            variant="ghost"
            className="w-full justify-start text-left"
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.label}
          </Button>
        ))}
      </nav>
    </div>
  );
};

// Login Component
const LoginPage = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('');

  const roles = ['Hospital Admin', 'Nurse', 'Doctor', 'Patient', 'Lab Scientist', 'Supervisor'];

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password && selectedRole) {
      const userData = { 
        email, 
        role: selectedRole, 
        name: mockUsers[email]?.name || 'User Name' 
      };
      login(userData);
      // Force navigation to dashboard
      window.location.href = '/dashboard';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <TestTube className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Labsy</h1>
          </div>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>Access your drug trial management system</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select your role</option>
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
          <div className="mt-4 text-sm text-gray-600">
            <p className="font-medium mb-2">Demo Accounts:</p>
            <ul className="space-y-1 text-xs">
              <li>admin@hospital.com - Hospital Admin</li>
              <li>doctor@hospital.com - Doctor</li>
              <li>nurse@hospital.com - Nurse</li>
              <li>patient@example.com - Patient</li>
              <li>lab@hospital.com - Lab Scientist</li>
              <li>supervisor@pharma.com - Supervisor</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Dashboard Components
const HospitalAdminDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">Hospital Admin Dashboard</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add New User
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active Trials</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <Progress value={75} className="mt-2" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Patients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">462</div>
            <div className="text-xs text-gray-500 mt-1">+12 this week</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Staff Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <div className="text-xs text-gray-500 mt-1">6 doctors, 12 nurses, 10 others</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Pending Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <div className="text-xs text-gray-500 mt-1">Requires attention</div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Dr. Michael Chen</TableCell>
                <TableCell>Approved patient consent</TableCell>
                <TableCell>2 hours ago</TableCell>
                <TableCell><Badge className="bg-green-100 text-green-800">Completed</Badge></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Maria Garcia</TableCell>
                <TableCell>Updated patient status</TableCell>
                <TableCell>4 hours ago</TableCell>
                <TableCell><Badge className="bg-green-100 text-green-800">Completed</Badge></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Dr. Emily Davis</TableCell>
                <TableCell>Uploaded test results</TableCell>
                <TableCell>6 hours ago</TableCell>
                <TableCell><Badge className="bg-yellow-100 text-yellow-800">Pending Review</Badge></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

const DoctorDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">Doctor Dashboard</h2>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Search className="mr-2 h-4 w-4" />
            Search Patient
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Consultation
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Pending Approvals</CardTitle>
            <CardDescription>Patient consent forms requiring your approval</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockPatients.filter(p => p.status === 'Pending').map((patient) => (
                <div key={patient.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{patient.name}</h4>
                    <p className="text-sm text-gray-500">Trial: {patient.trial}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="destructive">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Test Requests Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Alice Johnson - Blood Panel</p>
                  <p className="text-sm text-gray-500">Requested 2 days ago</p>
                </div>
                <Badge className="bg-yellow-100 text-yellow-800">In Progress</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Bob Williams - Liver Function</p>
                  <p className="text-sm text-gray-500">Requested 1 day ago</p>
                </div>
                <Badge className="bg-green-100 text-green-800">Completed</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Carol Brown - Kidney Function</p>
                  <p className="text-sm text-gray-500">Requested today</p>
                </div>
                <Badge className="bg-blue-100 text-blue-800">Scheduled</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const NurseDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">Nurse Dashboard</h2>
        <Button>
          <QrCode className="mr-2 h-4 w-4" />
          QR Scanner
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Today's Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 border rounded-lg">
                <input type="checkbox" className="rounded" />
                <div className="flex-1">
                  <p className="font-medium">Patient injection - Alice Johnson</p>
                  <p className="text-sm text-gray-500">Trial TRL-001 • 10:00 AM</p>
                </div>
                <Badge className="bg-red-100 text-red-800">High Priority</Badge>
              </div>
              <div className="flex items-center space-x-3 p-3 border rounded-lg">
                <input type="checkbox" className="rounded" />
                <div className="flex-1">
                  <p className="font-medium">Vital signs check - Bob Williams</p>
                  <p className="text-sm text-gray-500">Trial TRL-002 • 2:00 PM</p>
                </div>
                <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>
              </div>
              <div className="flex items-center space-x-3 p-3 border rounded-lg">
                <input type="checkbox" className="rounded" />
                <div className="flex-1">
                  <p className="font-medium">Re-test blood sample - Carol Brown</p>
                  <p className="text-sm text-gray-500">Trial TRL-001 • 4:00 PM</p>
                </div>
                <Badge className="bg-green-100 text-green-800">Normal</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full" variant="outline">
              <QrCode className="mr-2 h-4 w-4" />
              Scan Patient QR Code
            </Button>
            <Button className="w-full" variant="outline">
              <ClipboardCheck className="mr-2 h-4 w-4" />
              Update Patient Status
            </Button>
            <Button className="w-full" variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Follow-up
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const PatientDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">Patient Dashboard</h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Active Trial</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <div className="w-32 h-32 mx-auto bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                <QrCode className="h-16 w-16 text-gray-400" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Trial ID: TRL-001</h3>
                <p className="text-gray-600">COVID-19 Vaccine Phase III</p>
                <Badge className="mt-2 bg-green-100 text-green-800">Active Participant</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Follow-up Visit</p>
                  <p className="text-sm text-gray-500">Dr. Michael Chen</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">Jan 20, 2024</p>
                  <p className="text-sm text-gray-500">10:00 AM</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Blood Test</p>
                  <p className="text-sm text-gray-500">Lab Department</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">Jan 25, 2024</p>
                  <p className="text-sm text-gray-500">9:00 AM</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Consent Forms</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Initial Consent Form</p>
                <p className="text-sm text-gray-500">Signed on Jan 10, 2024</p>
              </div>
              <Badge className="bg-green-100 text-green-800">Signed</Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Data Sharing Agreement</p>
                <p className="text-sm text-gray-500">Pending signature</p>
              </div>
              <Button size="sm">Sign Now</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const LabScientistDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">Lab Scientist Dashboard</h2>
        <Button>
          <Upload className="mr-2 h-4 w-4" />
          Upload Results
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Test Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Test Type</TableHead>
                <TableHead>Requested By</TableHead>
                <TableHead>Deadline</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Alice Johnson</TableCell>
                <TableCell>Complete Blood Panel</TableCell>
                <TableCell>Dr. Michael Chen</TableCell>
                <TableCell>Jan 20, 2024</TableCell>
                <TableCell><Badge className="bg-yellow-100 text-yellow-800">In Progress</Badge></TableCell>
                <TableCell>
                  <Button size="sm" variant="outline">
                    <Upload className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Bob Williams</TableCell>
                <TableCell>Liver Function Test</TableCell>
                <TableCell>Dr. Sarah Johnson</TableCell>
                <TableCell>Jan 18, 2024</TableCell>
                <TableCell><Badge className="bg-green-100 text-green-800">Completed</Badge></TableCell>
                <TableCell>
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Carol Brown</TableCell>
                <TableCell>Kidney Function Test</TableCell>
                <TableCell>Dr. Michael Chen</TableCell>
                <TableCell>Jan 22, 2024</TableCell>
                <TableCell><Badge className="bg-blue-100 text-blue-800">Scheduled</Badge></TableCell>
                <TableCell>
                  <Button size="sm" variant="outline" disabled>
                    <Clock className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

const SupervisorDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">Supervisor Dashboard</h2>
        <Button>
          <Shield className="mr-2 h-4 w-4" />
          Blockchain Verification
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Reports Pending Validation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Trial TRL-001 Monthly Report</p>
                  <p className="text-sm text-gray-500">Submitted 2 days ago</p>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    <Check className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Adverse Events Report</p>
                  <p className="text-sm text-gray-500">Submitted 1 day ago</p>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    <Check className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Blockchain Verification</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Input placeholder="Enter Transaction ID / Hash" />
            </div>
            <Button className="w-full">
              <Shield className="mr-2 h-4 w-4" />
              Verify Data Integrity
            </Button>
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <Check className="h-5 w-5 text-green-600" />
                <span className="text-green-800 font-medium">Data Verified</span>
              </div>
              <p className="text-sm text-green-700 mt-1">All records match blockchain hash</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Main Dashboard Component
const Dashboard = () => {
  const { user } = useAuth();
  
  const renderDashboard = () => {
    switch (user?.role) {
      case 'Hospital Admin':
        return <HospitalAdminDashboard />;
      case 'Doctor':
        return <DoctorDashboard />;
      case 'Nurse':
        return <NurseDashboard />;
      case 'Patient':
        return <PatientDashboard />;
      case 'Lab Scientist':
        return <LabScientistDashboard />;
      case 'Supervisor':
        return <SupervisorDashboard />;
      default:
        return <div>Dashboard not found for role: {user?.role}</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          {renderDashboard()}
        </main>
      </div>
    </div>
  );
};

// Auth Provider Component
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    // Check for stored user data
    const storedUser = localStorage.getItem('labsy-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('labsy-user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('labsy-user');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <TestTube className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-pulse" />
          <p>Loading Labsy...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
};

// Main App Component
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;