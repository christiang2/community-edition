// React imports
import React, { useContext, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

// App imports
import { APP_ENV_CHANGE, APP_ROUTE_CHANGE } from './state-management/actions/App.actions';
import { NavRoutes } from './shared/constants/NavRoutes.constants';
import { Store } from './state-management/stores/Store';
import AwsManagementCluster from './views/management-cluster/aws/AwsManagementCluster';
import DeployProgress from './shared/components/DeployProgress/DeployProgress';
import DockerManagementCluster from './views/management-cluster/docker/DockerManagementCluster';
import GettingStarted from './views/getting-started/GettingStarted';
import HeaderBar from './shared/components/HeaderBar/HeaderBar';
import ManagementClusterInventory from './views/management-cluster/ManagementClusterInventory';
import ManagementClusterSelectProvider from './views/management-cluster/ManagementClusterSelectProvider';
import SideNavigation from './shared/components/SideNavigation/SideNavigation';
import UnmanagedClusterInventory from './views/unmanaged-cluster/UnmanagedClusterInventory';
import VsphereManagementCluster from './views/management-cluster/vsphere/VsphereManagementCluster';
import Welcome from './views/welcome/Welcome';
import WorkloadClusterInventory from './views/workload-cluster/WorkloadClusterInventory';
import WorkloadClusterWorkflow from './views/workload-cluster/WorkloadClusterWorkflow';
import UnmanagedClusterWizard from './views/unmanaged-cluster/UnmanagedClusterWizard';

function App() {
    const { dispatch } = useContext(Store);
    const location = useLocation();
    const currentPath = location.pathname;

    // TODO: this is for testing/setup of dark mode; sets body theme to dark
    // Will be refactored
    document.body.setAttribute('cds-theme', 'dark');
    document.body.setAttribute('class', 'dark');

    // set router path in store
    useEffect(() => {
        if (currentPath) {
            dispatch({
                type: APP_ROUTE_CHANGE,
                payload: {
                    value: currentPath,
                },
            });
        }
    }, [currentPath]); // eslint-disable-line react-hooks/exhaustive-deps

    // set app environment in store (dev/prod)
    useEffect(() => {
        if (process.env.NODE_ENV) {
            dispatch({
                type: APP_ENV_CHANGE,
                payload: {
                    value: process.env.NODE_ENV,
                },
            });
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <main cds-layout="vertical align:horizontal-stretch" cds-text="body">
            <HeaderBar />
            <section cds-layout="horizontal align:vertical-stretch wrap:none">
                <SideNavigation />
                <div cds-layout="vertical align:stretch">
                    <div cds-layout="grid gap:md gap@md:lg p:lg p@sm:lg p-y@lg:lg container:fill container:left cols:12">
                        <Routes>
                            <Route path={NavRoutes.AWS} element={<AwsManagementCluster />} />
                            <Route path={NavRoutes.DEPLOY_PROGRESS} element={<DeployProgress />} />
                            <Route path={NavRoutes.DOCKER} element={<DockerManagementCluster />} />
                            <Route path={NavRoutes.GETTING_STARTED} element={<GettingStarted />} />
                            <Route path={NavRoutes.MANAGEMENT_CLUSTER_INVENTORY} element={<ManagementClusterInventory />} />
                            <Route path={NavRoutes.MANAGEMENT_CLUSTER_SELECT_PROVIDER} element={<ManagementClusterSelectProvider />} />
                            <Route path={NavRoutes.UNMANAGED_CLUSTER_INVENTORY} element={<UnmanagedClusterInventory />} />
                            <Route path={NavRoutes.UNMANAGED_CLUSTER_WIZARD} element={<UnmanagedClusterWizard />} />
                            <Route path={NavRoutes.VSPHERE} element={<VsphereManagementCluster />} />
                            <Route path={NavRoutes.WELCOME} element={<Welcome />} />
                            <Route path={NavRoutes.WORKLOAD_CLUSTER_INVENTORY} element={<WorkloadClusterInventory />} />
                            <Route path={NavRoutes.WORKLOAD_CLUSTER_WIZARD} element={<WorkloadClusterWorkflow />} />
                        </Routes>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default App;
