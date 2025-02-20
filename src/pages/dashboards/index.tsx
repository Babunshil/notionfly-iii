import React, { useContext, useEffect } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';
import { VictoryChart, VictoryBar, VictoryGroup, VictoryAxis, VictoryPie } from 'victory-native';
import { AddButton } from '../../components/AddButton';
import { NotionContext } from '../../contexts/NotionContext';
import { groupAndSumBy } from './../../utils/array.utils';

export function Dashboards() {
  const notionCore = useContext(NotionContext);

  const [chartData, setChartData] = React.useState([]);
  const [pieChartData, setPieChartData] = React.useState([]);


  let exChartData = [
    {
      name: 'Red',
      population: 45,
      color: 'red',
      legendFontColor: 'black',
      legendFontSize: 15,
    },
    {
      name: 'Blue',
      population: 30,
      color: 'blue',
      legendFontColor: 'black',
      legendFontSize: 15,
    },
    {
      name: 'Green',
      population: 25,
      color: 'green',
      legendFontColor: 'black',
      legendFontSize: 15,
    },
  ];

  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99],
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const barChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    datasets: [
      {
        data: [30, 40, 10, 45, 60],
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        barPercentage: 0.5,
      },
    ],
  };


  const lastDaysData = [
    { day: 'Seg', received: 100, spent: 80 },
    { day: 'Ter', received: 200, spent: 120 },
    { day: 'Qua', received: 150, spent: 90 },
    { day: 'Qui', received: 250, spent: 150 },
    { day: 'Sex', received: 180, spent: 100 },
    { day: 'Sáb', received: 220, spent: 140 },
    { day: 'Dom', received: 300, spent: 200 },
  ];

  function getPiechart() {
    let categoriesChart = []
    notionCore.transactions.map((trans) => {
      // return notionCore.transactions[0].map((trans) => {
      trans.category.map((category) => {
        categoriesChart.push({
          x: category.name,
          y: trans.amount,
          color: category.color
        })
      })
    })

    return groupAndSumBy(categoriesChart, "x", "y").sort(function (a, b) { return b.y - a.y })
  }

  function getLastMonthsChart() {
    let lastMonthsChart = []
    notionCore.accounts.map((trans) => {
      // return notionCore.transactions[0].map((trans) => {
      // trans.category.map((category) => {
      //   categoriesChart.push({
      //     name: category.name,
      //     population: trans.amount,
      //     color: category.color,
      //     legendFontColor: 'black',
      //     legendFontSize: 12,
      //   })
      // })
    })
  }

  useEffect(() => {
    setPieChartData(getPiechart)
    // eslint-disable-next-line
  }, [notionCore.transactions])

  return (
    <>
      <ScrollView
        className="flex-1"
      >
        <View className="p-4">

          <View className="flex items-center justify-center">

            {/* {
              notionCore.loading ? (<Text>carregando...</Text>)
                : (<Text>ja carregou {JSON.stringify(notionCore.transactions)}</Text>)
            } */}

            {/* Gráfico Últimos Dias */}
            <View className="ml-8 ">
              <VictoryChart
                domainPadding={{ x: 20 }}
                width={350}
                height={300}
              >
                <VictoryGroup offset={10}>
                  <VictoryBar data={lastDaysData} x="day" y="received" style={{ data: { fill: '#008000' } }} />
                  <VictoryBar data={lastDaysData} x="day" y="spent" style={{ data: { fill: '#FF0000' } }} />
                </VictoryGroup>
                <VictoryAxis tickValues={lastDaysData.map((item) => item.day)} />
                <VictoryAxis dependentAxis tickFormat={(x) => `R$${x}`} />
              </VictoryChart>
            </View>
            <Text>Recebido vs. Gasto nos últimos 7 dias</Text>

            {/* Gráfico de Pizza */}
            <Text>Distribuição de Despesas</Text>
            <View className="flex-row align-middle text-center items-center">
              <VictoryPie
                width={250}
                height={250}
                padAngle={1}
                // innerRadius={50}
                data={pieChartData}
                colorScale={pieChartData.map((item) => item.color)}
                labels={({ datum, index }) => index < 3 ? `${datum.y}` : ''}
              // labelRadius={75}
              // style={{ labels: { fill: 'black' } }}
              />

              <View className="flex-col -ml-9">
                {pieChartData.map((item, index) => (
                  <View key={index} className="flex-row items-center mb-3">
                    <View className="w-4 h-4 mr-1 rounded-full" style={{ backgroundColor: item.color }} />
                    <Text numberOfLines={1}>{item.x}</Text>
                  </View>
                ))}
              </View>
            </View>
            {/* Gráfico de Linha */}
            <LineChart
              data={lineChartData}
              width={300}
              height={200}
              yAxisLabel="$"
              chartConfig={{
                backgroundGradientFrom: 'white',
                backgroundGradientTo: 'white',
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
              bezier
              className="my-4"
            />

            {/* Gráfico de Barras */}
            <BarChart
              data={barChartData}
              width={300}
              height={200}
              yAxisLabel="$"
              chartConfig={{
                backgroundGradientFrom: 'white',
                backgroundGradientTo: 'white',
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
              className="my-4"
            />
          </View>
        </View>
      </ScrollView>
      <AddButton />
    </>
  );
}
