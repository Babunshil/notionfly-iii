import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const AppStack = createStackNavigator();

import { Home } from '../pages/home/home';
import { FirstAccess } from '../pages/first-access/first-access';
// import { Transaction } from '../pages/transaction/transaction';
// import { Dashboards } from '../pages/dashboards/dashboards';
import { DrawerRoutes } from './drawer.routes';

export function StackRoutes() {
  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      <AppStack.Screen name="FirstAccess" component={FirstAccess} />
      <AppStack.Screen name="Home" component={Home} />
      {/* <AppStack.Screen name="Dashboards" component={Dashboards} /> */}
      {/* <AppStack.Screen name="Transaction" component={Transaction} /> */}

      <AppStack.Screen name="Drawer" component={DrawerRoutes} />

    </AppStack.Navigator>
  );
}
