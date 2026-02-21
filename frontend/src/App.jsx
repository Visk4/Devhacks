import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import Landingpage from "./pages/Landingpage";
import Loginpage from "./pages/Loginpage";
import Registerpage from "./pages/Registerpage";


const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route index element={<Landingpage />} />

        {/* Admin Routes */}
        {/* <Route path="admin">
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="KYCManagement" element={<KYCManagement />} />
          <Route path="loansmanagement" element={<LoanManagement />} />
          <Route path="user-management" element={<UserManagementPage />} />
          <Route path="comp" element={<Comp />} />
        </Route> */}

        {/* Borrower Routes */}
        {/* <Route path="borrower" element={<BorrowerLayout />}>
          <Route path="dashboard" element={<PrivateRoute><Borrowerdashboardpage /></PrivateRoute>} />
          <Route path="loan-application" element={<PrivateRoute><LoanApplicationForm /></PrivateRoute>} />
          <Route path="loansManagement" element={<PrivateRoute><MyLoansPage/></PrivateRoute>} />
          <Route path="repayment" element={<PrivateRoute><RepaymentPage /></PrivateRoute>} />
          <Route path="kyc-form" element={<PrivateRoute><KYCform /></PrivateRoute>} />
          <Route path="profile" element={<PrivateRoute><BorrowerProfilePage /></PrivateRoute>} />
        </Route> */}

        {/* Lender Routes */}
        {/* <Route path="lender" element={<LenderLayout />}>
          <Route path="dashboard" element={<PrivateRoute><LenderDashboardPage /></PrivateRoute>} />
          <Route path="invest" element={<PrivateRoute><InvestForm /></PrivateRoute>} />
          <Route path="my-investment" element={<PrivateRoute><Investment /></PrivateRoute>} />
          <Route path="profile" element={<PrivateRoute><LenderProfilePage /></PrivateRoute>} /> 
          <Route path="earnings" element={<PrivateRoute><LenderEarningsPage /></PrivateRoute>} />

        </Route> */}

        <Route path="login" element={<Loginpage />} />
        <Route path="register" element={<Registerpage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
