import { Navigation } from 'react-native-navigation'

export const postLoginNavigation = () => {

    Navigation.setDefaultOptions({
        statusBar: {
          style: "light",
        }
      })

    Navigation.setRoot({
        root: {
          bottomTabs: {
            id: 'PostLoginBottomTabs',
            options: {
              bottomTabs: {
                visible: true,
                backgroundColor: 'black'
              },
              statusBar: {
                style: 'light'
              },
              topBar: {
                background: {
                  color: 'rgba(15, 15, 15, 1)'
                }
              }
            },
            children: [
              {
                stack: {
                  options: {
                    statusBar: {
                      style: 'light'
                    }
                  },
                  children: [
                    {
                      component: {
                        id: 'EnergyStocks',
                        name: 'EnergyStocks',
                        options: {
                          title: {
                            text: 'EnergyStocks'
                          },
                          statusBar: {
                            style: 'light'
                          },
                          topBar: {
                            background: {
                              // color: 'rgba(0, 55, 80, 1)',
                              color: 'rgba(15, 15, 15, 1)',
                              component: {
                                name: 'StocksHeader'
                              }
                            },
                            rightButtons: [
                              {
                                id: 'Settings',
                                icon: require('../assets/cog.png'),
                                color : 'rgba(150, 150, 150, 1)',
                              },
                            ],
                          },
                          bottomTab: {
                            fontSize: 12,
                            text: 'Energy Stocks',
                            textColor: 'rgba(200, 200, 200, 1)',
                            icon: require('../assets/arrow.png'),
                            iconColor: 'rgba(200, 200, 200, 1)',
                            selectedIconColor: 'white',
                            selectedTextColor: 'white'
                          }
                        } 
                      }
                    }
                  ]
                }
              },
              {
                stack: {
                  options: {
                    statusBar: {
                      style: 'light'
                    }
                  },
                  children: [
                    {
                      component: {
                        id: "EnergyNews",
                        name: 'EnergyNews',
                        options: {
                          title: {
                            text: 'EnergyNews'
                          },
                          statusBar: {
                            style: 'light'
                          },
                          topBar: {
                            background: {
                              // color: 'rgba(0, 55, 80, 1)',
                              color: 'rgba(15, 15, 15, 1)',
                              component: {
                                name: 'EnergyNewsHeader'
                              },
                            },
                            rightButtons: [
                              {
                                id: 'Settings',
                                icon: require('../assets/cog.png'),
                                color : 'rgba(150, 150, 150, 1)'
                              }
                            ]
                          },
                          bottomTab: {
                            fontSize: 12,
                            text: 'Energy News',
                            textColor: 'rgba(200, 200, 200, 1)',
                            icon: require('../assets/lightning.png'),
                            iconColor: 'rgba(200, 200, 200, 1)',
                            selectedIconColor: 'white',
                            selectedTextColor: 'white'
                          }
                        }
                      }
                    }
                  ]
                }
              },
              {
                stack: {
                  children: [
                    {
                      component : {
                        id: 'EnergyTechWeekly',
                        name: 'EnergyTechWeekly',
                        options: {
                          statusBar: {
                            style: 'light'
                        },
                          title: {
                            text: 'EnergyTechWeekly'
                          },
                          topBar: {
                            title: {
                              text: 'TPH&CO',
                              alignment: 'center',
                              fontSize: 20,
                            },
                            background: {
                              // color: 'rgba(0, 55, 80, 1)',
                              color: 'rgba(15, 15, 15, 1)',
                              // component: {
                                // name: ''
                              // }
                            },
                            rightButtons: [
                              {
                                id: 'Settings',
                                icon: require('../assets/cog.png'),
                                color : 'rgba(150, 150, 150, 1)'
                              }
                            ],
                            leftButtons: [
                              {
                                id: 'IssueList',
                                text: 'Issues List',
                              }
                            ]
                          },
                          bottomTab: {
                            fontSize: 12,
                            text: 'E-Tech Weekly',
                            textColor: 'rgba(200, 200, 200, 1)',
                            icon: require('../assets/etech.png'),
                            iconColor: 'rgba(200, 200, 200, 1)',
                            selectedIconColor: 'white',
                            selectedTextColor: 'white'
                          }
                        }
                      }
                    }
                  ] 
                }
              },
              {
                stack: {
                  options: {
                    statusBar: {
                      style: 'light'
                  }
                  },
                  children: [
                    {
                      component: {
                        id: "TPHEvents",
                        name: "TPHEvents",
                        options: {
                          statusBar: {
                            style: 'light'
                        },
                          title: {
                            text: 'TPHEvents'
                          },
                          topBar: {
                            background: {
                              // color: 'rgba(0, 55, 80, 1)',
                              color: 'rgba(15, 15, 15, 1)',
                              // component: {
                                // name: ''
                              // }
                            },
                            rightButtons: [
                              {
                                id: 'Settings',
                                icon: require('../assets/cog.png'),
                                color : 'rgba(150, 150, 150, 1)',
                              }
                            ]
                          },
                          bottomTab: {
                            fontSize: 12,
                            text: 'TPH Events',
                            textColor: 'rgba(200, 200, 200, 1)',
                            icon: require('../assets/calendar.png'),
                            iconColor: 'rgba(200, 200, 200, 1)',
                            selectedIconColor: 'white',
                            selectedTextColor: 'white',
                          }
                        }
                      }
                    }
                  ]
                }
              }
            ]
          }
        }
      })
}

export const goToScreen = (id, screenName, screenTitle) => {
    Navigation.push(id, {
      component: {
        options: {
          topBar: {
            visible: 'true',
            title: {
              text: screenTitle
            }
          }
        },
        name: screenName
      }
    })
}