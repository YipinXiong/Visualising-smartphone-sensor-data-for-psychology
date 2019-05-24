let map;

let currentMarkers = [];

const appUsagesByWeek = [{
  'date': '04-10',
  'AppFreq': 61,
  'totalFreq': 137,
  'MostUsed': 'Afternoon',
  'app': {
    'Clock': 1,
    'Samsung Pay': 12,
    'Phone': 19,
    'Messages': 2,
    'Gmail': 3,
    'Hangouts': 1,
    'Chrome': 23
  }
}, {
  'date': '04-11',
  'AppFreq': 96,
  'totalFreq': 167,
  'MostUsed': 'Afternoon',
  'app': {
    'Phone': 22,
    'Samsung Pay': 17,
    'Chrome': 16,
    'Messages': 9,
    'UPRIGHT GO': 7,
    'SEMA3': 5,
    'WhatsApp': 3,
    'Clock': 3,
    'Settings': 3,
    'others': 11
  }
}, {
  'date': '04-12',
  'AppFreq': 136,
  'totalFreq': 197,
  'MostUsed': 'Afternoon',
  'app': {
    'Phone': 41,
    'Chrome': 31,
    'Messages': 23,
    'Samsung Pay': 21,
    'SEMA3': 5,
    'Settings': 5,
    'Calendar': 4,
    'Gmail': 3,
    'Twitter': 2,
    'others': 1
  }
}, {
  'date': '04-13',
  'AppFreq': 203,
  'totalFreq': 217,
  'MostUsed': 'Afternoon',
  'app': {
    'Phone': 44,
    'Skype': 32,
    'Chrome': 31,
    'Messages': 27,
    'Samsung Pay': 24,
    'Twitter': 8,
    'Samsung Health': 7,
    'Gmail': 6,
    'Maps': 5,
    'others': 19
  }
}, {
  'date': '04-14',
  'AppFreq': 163,
  'totalFreq': 215,
  'MostUsed': 'Afternoon',
  'app': {
    'Phone': 36,
    'Samsung Pay': 31,
    'Messages': 31,
    'Chrome': 30,
    'Twitter': 11,
    'Hangouts': 5,
    'WhatsApp': 3,
    'Camera': 3,
    'Gallery': 3,
    'others': 10
  }
}, {
  'date': '04-15',
  'AppFreq': 113,
  'totalFreq': 246,
  'MostUsed': 'Afternoon',
  'app': {
    'Chrome': 49,
    'Samsung Pay': 22,
    'Phone': 16,
    'Twitter': 8,
    'Gmail': 7,
    'Settings': 2,
    'Messages': 2,
    'Camera': 2,
    'Gallery': 2,
    'others': 3
  }
}, {
  'date': '04-16',
  'AppFreq': 56,
  'totalFreq': 69,
  'MostUsed': 'Morning',
  'app': {
    'Phone': 22,
    'Samsung Pay': 9,
    'Chrome': 9,
    'Messages': 4,
    'Clock': 3,
    'Gmail': 3,
    'WhatsApp': 2,
    'Calendar': 2,
    'Gallery': 1,
    'others': 1
  }
}]

const appUsagesByMonth = [{
  'date': '03-25',
  'AppFreq': 9,
  'totalFreq': 248,
  'MostUsed': 'Afternoon',
  'app': {
    'Settings': 1,
    'Samsung Pay': 2,
    'Twitter': 3,
    'Messages': 2,
    'Phone': 1
  }
}, {
  'date': '03-26',
  'AppFreq': 149,
  'totalFreq': 185,
  'MostUsed': 'Afternoon',
  'app': {
    'Phone': 52,
    'Samsung Pay': 39,
    'Chrome': 19,
    'Samsung Health': 12,
    'Messages': 8,
    'Gmail': 7,
    'Calendar': 3,
    'Galaxy Store': 2,
    'Weather': 2,
    'others': 5
  }
}, {
  'date': '03-27',
  'AppFreq': 183,
  'totalFreq': 300,
  'MostUsed': 'Afternoon',
  'app': {
    'Phone': 48,
    'Samsung Pay': 38,
    'Chrome': 32,
    'Messages': 29,
    'Twitter': 9,
    'Gmail': 6,
    'Settings': 4,
    'Samsung capture': 3,
    'Package installer': 3,
    'others': 11
  }
}, {
  'date': '03-28',
  'AppFreq': 63,
  'totalFreq': 110,
  'MostUsed': 'Afternoon',
  'app': {
    'Phone': 17,
    'Clock': 3,
    'Samsung Pay': 12,
    'Messages': 15,
    'Gmail': 4,
    'Calendar': 2,
    'Chrome': 8,
    'Twitter': 2
  }
}, {
  'date': '03-29',
  'AppFreq': 123,
  'totalFreq': 246,
  'MostUsed': 'Afternoon',
  'app': {
    'Samsung Pay': 29,
    'Chrome': 28,
    'Phone': 19,
    'Twitter': 18,
    'Messages': 12,
    'Gmail': 5,
    'Samsung Internet': 4,
    'Clock': 3,
    'Calendar': 3,
    'others': 2
  }
}, {
  'date': '03-30',
  'AppFreq': 91,
  'totalFreq': 131,
  'MostUsed': 'Afternoon',
  'app': {
    'Samsung Pay': 18,
    'Gmail': 6,
    'Chrome': 11,
    'Twitter': 10,
    'Samsung Internet': 9,
    'Phone': 23,
    'Messages': 14
  }
}, {
  'date': '03-31',
  'AppFreq': 49,
  'totalFreq': 55,
  'MostUsed': 'Morning',
  'app': {
    'Samsung Pay': 11,
    'Phone': 10,
    'Chrome': 6,
    'Settings': 5,
    'Messages': 4,
    'Twitter': 4,
    'Hangouts': 3,
    'Google': 3,
    'Samsung Internet': 1,
    'others': 2
  }
}, {
  'date': '04-01',
  'AppFreq': 92,
  'totalFreq': 216,
  'MostUsed': 'Afternoon',
  'app': {
    'Chrome': 25,
    'Samsung Pay': 20,
    'Messages': 18,
    'Phone': 13,
    'Twitter': 5,
    'Samsung Internet': 4,
    'Gmail': 2,
    'Samsung Health': 2,
    'Settings': 1,
    'others': 2
  }
}, {
  'date': '04-02',
  'AppFreq': 81,
  'totalFreq': 110,
  'MostUsed': 'Afternoon',
  'app': {
    'Phone': 28,
    'Chrome': 21,
    'Samsung Pay': 8,
    'Gmail': 6,
    'Twitter': 5,
    'Messages': 4,
    'Samsung Internet': 2,
    'Gallery': 2,
    'Samsung Notes': 2,
    'others': 3
  }
}, {
  'date': '04-03',
  'AppFreq': 112,
  'totalFreq': 217,
  'MostUsed': 'Afternoon',
  'app': {
    'Chrome': 33,
    'Phone': 25,
    'Samsung Pay': 24,
    'Messages': 15,
    'Gmail': 4,
    'Gallery': 4,
    'Clock': 2,
    'Twitter': 2,
    'Calendar': 1,
    'others': 2
  }
}, {
  'date': '04-04',
  'AppFreq': 131,
  'totalFreq': 358,
  'MostUsed': 'Afternoon',
  'app': {
    'Samsung Pay': 26,
    'Gmail': 3,
    'Chrome': 30,
    'Twitter': 13,
    'Phone': 24,
    'Messages': 18,
    'Clock': 3,
    'Calendar': 4,
    'Hangouts': 10
  }
}, {
  'date': '04-05',
  'AppFreq': 115,
  'totalFreq': 247,
  'MostUsed': 'Afternoon',
  'app': {
    'Chrome': 38,
    'Samsung Pay': 18,
    'Phone': 18,
    'Messages': 16,
    'Hangouts': 8,
    'Maps': 6,
    'Calendar': 4,
    'Clock': 3,
    'Gmail': 3,
    'others': 1
  }
}, {
  'date': '04-06',
  'AppFreq': 62,
  'totalFreq': 107,
  'MostUsed': 'LateNight',
  'app': {
    'Twitter': 8,
    'Samsung Pay': 18,
    'Chrome': 8,
    'Messages': 5,
    'Phone': 15,
    'Hangouts': 4,
    'Clock': 3,
    'Samsung Internet': 1
  }
}, {
  'date': '04-07',
  'AppFreq': 122,
  'totalFreq': 164,
  'MostUsed': 'Morning',
  'app': {
    'Messages': 3,
    'Chrome': 70,
    'Gallery': 4,
    'Twitter': 2,
    'Samsung Pay': 11,
    'Phone': 25,
    'Camera': 4,
    'Gmail': 2,
    'Hangouts': 1
  }
}, {
  'date': '04-08',
  'AppFreq': 99,
  'totalFreq': 205,
  'MostUsed': 'Afternoon',
  'app': {
    'Chrome': 31,
    'Samsung Pay': 14,
    'Messages': 14,
    'Phone': 11,
    'Twitter': 9,
    'Westpac': 8,
    'Gmail': 6,
    'Gallery': 2,
    'Samsung capture': 1,
    'others': 3
  }
}, {
  'date': '04-09',
  'AppFreq': 120,
  'totalFreq': 184,
  'MostUsed': 'Afternoon',
  'app': {
    'Chrome': 36,
    'Samsung Pay': 20,
    'Phone': 15,
    'Messages': 14,
    'Skype': 11,
    'Google Play Store': 5,
    'Twitter': 5,
    'Package installer': 4,
    'SEMA3': 3,
    'others': 7
  }
}, {
  'date': '04-10',
  'AppFreq': 65,
  'totalFreq': 144,
  'MostUsed': 'Afternoon',
  'app': {
    'Twitter': 1,
    'Samsung Pay': 15,
    'Clock': 1,
    'Phone': 19,
    'Messages': 2,
    'Gmail': 3,
    'Hangouts': 1,
    'Chrome': 23
  }
}, {
  'date': '04-11',
  'AppFreq': 96,
  'totalFreq': 167,
  'MostUsed': 'Afternoon',
  'app': {
    'Phone': 22,
    'Samsung Pay': 17,
    'Chrome': 16,
    'Messages': 9,
    'UPRIGHT GO': 7,
    'SEMA3': 5,
    'WhatsApp': 3,
    'Clock': 3,
    'Settings': 3,
    'others': 11
  }
}, {
  'date': '04-12',
  'AppFreq': 136,
  'totalFreq': 197,
  'MostUsed': 'Afternoon',
  'app': {
    'Phone': 41,
    'Chrome': 31,
    'Messages': 23,
    'Samsung Pay': 21,
    'SEMA3': 5,
    'Settings': 5,
    'Calendar': 4,
    'Gmail': 3,
    'Twitter': 2,
    'others': 1
  }
}, {
  'date': '04-13',
  'AppFreq': 203,
  'totalFreq': 217,
  'MostUsed': 'Afternoon',
  'app': {
    'Phone': 44,
    'Skype': 32,
    'Chrome': 31,
    'Messages': 27,
    'Samsung Pay': 24,
    'Twitter': 8,
    'Samsung Health': 7,
    'Gmail': 6,
    'Maps': 5,
    'others': 19
  }
}, {
  'date': '04-14',
  'AppFreq': 163,
  'totalFreq': 215,
  'MostUsed': 'Afternoon',
  'app': {
    'Phone': 36,
    'Samsung Pay': 31,
    'Messages': 31,
    'Chrome': 30,
    'Twitter': 11,
    'Hangouts': 5,
    'WhatsApp': 3,
    'Camera': 3,
    'Gallery': 3,
    'others': 10
  }
}, {
  'date': '04-15',
  'AppFreq': 113,
  'totalFreq': 246,
  'MostUsed': 'Afternoon',
  'app': {
    'Chrome': 49,
    'Samsung Pay': 22,
    'Phone': 16,
    'Twitter': 8,
    'Gmail': 7,
    'Settings': 2,
    'Messages': 2,
    'Camera': 2,
    'Gallery': 2,
    'others': 3
  }
}, {
  'date': '04-16',
  'AppFreq': 56,
  'totalFreq': 69,
  'MostUsed': 'Morning',
  'app': {
    'Phone': 22,
    'Samsung Pay': 9,
    'Chrome': 9,
    'Messages': 4,
    'Clock': 3,
    'Gmail': 3,
    'WhatsApp': 2,
    'Calendar': 2,
    'Gallery': 1,
    'others': 1
  }
}]

const callingsByWeek = [{
  "date": "04-09",
  "Incoming": 3,
  "Outgoing": 1,
  "Missed": 0
}, {
  "date": "04-10",
  "Incoming": 1,
  "Outgoing": 6,
  "Missed": 5
}, {
  "date": "04-11",
  "Incoming": 1,
  "Outgoing": 5,
  "Missed": 4
}, {
  "date": "04-12",
  "Incoming": 0,
  "Outgoing": 4,
  "Missed": 4
}, {
  "date": "04-13",
  "Incoming": 1,
  "Outgoing": 1,
  "Missed": 1
}, {
  "date": "04-14",
  "Incoming": 9,
  "Outgoing": 8,
  "Missed": 6
}, {
  "date": "04-15",
  "Incoming": 2,
  "Outgoing": 6,
  "Missed": 4
}]

const callingsByMonth = [{
  "date": "03-25",
  "Incoming": 3,
  "Outgoing": 5,
  "Missed": 6
}, {
  "date": "03-26",
  "Incoming": 3,
  "Outgoing": 8,
  "Missed": 8
}, {
  "date": "03-27",
  "Incoming": 2,
  "Outgoing": 7,
  "Missed": 6
}, {
  "date": "03-28",
  "Incoming": 3,
  "Outgoing": 3,
  "Missed": 3
}, {
  "date": "03-29",
  "Incoming": 1,
  "Outgoing": 2,
  "Missed": 3
}, {
  "date": "03-30",
  "Incoming": 2,
  "Outgoing": 2,
  "Missed": 7
}, {
  "date": "03-31",
  "Incoming": 1,
  "Outgoing": 2,
  "Missed": 0
}, {
  "date": "04-01",
  "Incoming": 0,
  "Outgoing": 4,
  "Missed": 1
}, {
  "date": "04-02",
  "Incoming": 3,
  "Outgoing": 4,
  "Missed": 3
}, {
  "date": "04-03",
  "Incoming": 2,
  "Outgoing": 4,
  "Missed": 3
}, {
  "date": "04-04",
  "Incoming": 5,
  "Outgoing": 4,
  "Missed": 5
}, {
  "date": "04-05",
  "Incoming": 0,
  "Outgoing": 4,
  "Missed": 1
}, {
  "date": "04-06",
  "Incoming": 2,
  "Outgoing": 2,
  "Missed": 3
}, {
  "date": "04-07",
  "Incoming": 4,
  "Outgoing": 4,
  "Missed": 3
}, {
  "date": "04-08",
  "Incoming": 0,
  "Outgoing": 1,
  "Missed": 2
}, {
  "date": "04-09",
  "Incoming": 2,
  "Outgoing": 3,
  "Missed": 3
}, {
  "date": "04-10",
  "Incoming": 1,
  "Outgoing": 4,
  "Missed": 2
}, {
  "date": "04-11",
  "Incoming": 3,
  "Outgoing": 3,
  "Missed": 3
}, {
  "date": "04-12",
  "Incoming": 6,
  "Outgoing": 7,
  "Missed": 5
}, {
  "date": "04-13",
  "Incoming": 4,
  "Outgoing": 7,
  "Missed": 8
}, {
  "date": "04-14",
  "Incoming": 3,
  "Outgoing": 6,
  "Missed": 3
}, {
  "date": "04-15",
  "Incoming": 1,
  "Outgoing": 2,
  "Missed": 4
}, {
  "date": "04-16",
  "Incoming": 3,
  "Outgoing": 3,
  "Missed": 0
}]

const messagesByWeek = [{
  "date": "04-09",
  "Received": 2,
  "Sent": 1,
  "ReceivedSentRatio": 2,
  "SentReceivedRatio": 1.0
}, {
  "date": "04-13",
  "Received": 1,
  "Sent": 0,
  "ReceivedSentRatio": 1,
  "SentReceivedRatio": 0.0
}]

const messagesByMonth = [{
  "date": "03-25",
  "Received": 7,
  "Sent": 4,
  "ReceivedSentRatio": 1.75,
  "SentReceivedRatio": 0.5714285714285714
}, {
  "date": "03-26",
  "Received": 5,
  "Sent": 1,
  "ReceivedSentRatio": 5.0,
  "SentReceivedRatio": 0.2
}, {
  "date": "03-27",
  "Received": 10,
  "Sent": 4,
  "ReceivedSentRatio": 2.5,
  "SentReceivedRatio": 0.4
}, {
  "date": "03-28",
  "Received": 7,
  "Sent": 2,
  "ReceivedSentRatio": 3.5,
  "SentReceivedRatio": 0.2857142857142857
}, {
  "date": "03-29",
  "Received": 5,
  "Sent": 2,
  "ReceivedSentRatio": 2.5,
  "SentReceivedRatio": 0.4
}, {
  "date": "03-30",
  "Received": 10,
  "Sent": 3,
  "ReceivedSentRatio": 3.3333333333333335,
  "SentReceivedRatio": 0.3
}, {
  "date": "03-31",
  "Received": 1,
  "Sent": 1,
  "ReceivedSentRatio": 1.0,
  "SentReceivedRatio": 1.0
}, {
  "date": "04-01",
  "Received": 9,
  "Sent": 6,
  "ReceivedSentRatio": 1.5,
  "SentReceivedRatio": 0.6666666666666666
}, {
  "date": "04-02",
  "Received": 6,
  "Sent": 1,
  "ReceivedSentRatio": 6.0,
  "SentReceivedRatio": 0.16666666666666666
}, {
  "date": "04-03",
  "Received": 14,
  "Sent": 4,
  "ReceivedSentRatio": 3.5,
  "SentReceivedRatio": 0.2857142857142857
}, {
  "date": "04-04",
  "Received": 7,
  "Sent": 6,
  "ReceivedSentRatio": 1.1666666666666667,
  "SentReceivedRatio": 0.8571428571428571
}, {
  "date": "04-05",
  "Received": 6,
  "Sent": 3,
  "ReceivedSentRatio": 2.0,
  "SentReceivedRatio": 0.5
}, {
  "date": "04-06",
  "Received": 5,
  "Sent": 2,
  "ReceivedSentRatio": 2.5,
  "SentReceivedRatio": 0.4
}, {
  "date": "04-07",
  "Received": 2,
  "Sent": 0,
  "ReceivedSentRatio": 2,
  "SentReceivedRatio": 0.0
}, {
  "date": "04-08",
  "Received": 14,
  "Sent": 14,
  "ReceivedSentRatio": 1.0,
  "SentReceivedRatio": 1.0
}, {
  "date": "04-09",
  "Received": 7,
  "Sent": 2,
  "ReceivedSentRatio": 3.5,
  "SentReceivedRatio": 0.2857142857142857
}, {
  "date": "04-10",
  "Received": 3,
  "Sent": 0,
  "ReceivedSentRatio": 3,
  "SentReceivedRatio": 0.0
}, {
  "date": "04-11",
  "Received": 7,
  "Sent": 2,
  "ReceivedSentRatio": 3.5,
  "SentReceivedRatio": 0.2857142857142857
}, {
  "date": "04-12",
  "Received": 19,
  "Sent": 4,
  "ReceivedSentRatio": 4.75,
  "SentReceivedRatio": 0.21052631578947367
}, {
  "date": "04-13",
  "Received": 7,
  "Sent": 3,
  "ReceivedSentRatio": 2.3333333333333335,
  "SentReceivedRatio": 0.42857142857142855
}, {
  "date": "04-14",
  "Received": 18,
  "Sent": 10,
  "ReceivedSentRatio": 1.8,
  "SentReceivedRatio": 0.5555555555555556
}, {
  "date": "04-15",
  "Received": 2,
  "Sent": 0,
  "ReceivedSentRatio": 2,
  "SentReceivedRatio": 0.0
}, {
  "date": "04-16",
  "Received": 2,
  "Sent": 0,
  "ReceivedSentRatio": 2,
  "SentReceivedRatio": 0.0
}]

const locationsByWeek = [{
  "lat": -37.7989245,
  "lng": 144.9627069
}, {
  "lat": -37.7005848,
  "lng": 144.9641808
}, {
  "lat": -37.7818114,
  "lng": 144.9414935
}, {
  "lat": -37.7805282,
  "lng": 144.9476827
}, {
  "lat": -37.7743511,
  "lng": 144.9600342
}, {
  "lat": -37.7684239,
  "lng": 144.972261
}, {
  "lat": -37.788879,
  "lng": 144.9417792
}, {
  "lat": -37.8020074,
  "lng": 144.9067458
}, {
  "lat": -37.6899439,
  "lng": 144.9596565
}, {
  "lat": -37.7021462,
  "lng": 144.969371
}, {
  "lat": -37.6475295,
  "lng": 145.0282439
}]

let locations = locationsByWeek;
const locationsByMonth = [{
  "lat": -37.700588,
  "lng": 144.9641675
}, {
  "lat": -37.6891507,
  "lng": 144.959562
}, {
  "lat": -37.7141529,
  "lng": 144.9624091
}, {
  "lat": -37.7336565,
  "lng": 144.9651035
}, {
  "lat": -37.7314297,
  "lng": 144.9494965
}, {
  "lat": -37.747131,
  "lng": 144.944784
}, {
  "lat": -37.7726216,
  "lng": 144.9493486
}, {
  "lat": -37.7822253,
  "lng": 144.9508181
}, {
  "lat": -37.7804538,
  "lng": 144.9476739
}, {
  "lat": -37.7988101,
  "lng": 144.963202
}, {
  "lat": -37.7622917,
  "lng": 144.9444318
}, {
  "lat": -37.7747486,
  "lng": 144.9607078
}, {
  "lat": -37.790395,
  "lng": 144.9585514
}, {
  "lat": -37.7818114,
  "lng": 144.9414935
}, {
  "lat": -37.7057372,
  "lng": 144.9611078
}, {
  "lat": -37.7273075,
  "lng": 144.9637323
}, {
  "lat": -37.7324585,
  "lng": 144.9592136
}, {
  "lat": -37.7681459,
  "lng": 144.9618263
}, {
  "lat": -37.6476341,
  "lng": 145.0283207
}, {
  "lat": -37.6948934,
  "lng": 144.9588297
}, {
  "lat": -37.7384666,
  "lng": 144.9669215
}, {
  "lat": -37.7684239,
  "lng": 144.972261
}, {
  "lat": -37.788879,
  "lng": 144.9417792
}, {
  "lat": -37.8020074,
  "lng": 144.9067458
}]

const screensByWeek = [{
  'Date': '2019-05-16',
  'Most used': 'Night',
  'Frequency': 5
}, {
  'Date': '2019-05-17',
  'Most used': 'Evening',
  'Frequency': 43
}, {
  'Date': '2019-05-18',
  'Most used': 'Morning',
  'Frequency': 45
}, {
  'Date': '2019-05-19',
  'Most used': 'Night',
  'Frequency': 26
}, {
  'Date': '2019-05-20',
  'Most used': 'Afternoon',
  'Frequency': 38
}, {
  'Date': '2019-05-21',
  'Most used': 'Night',
  'Frequency': 50
}, {
  'Date': '2019-05-22',
  'Most used': 'Morning',
  'Frequency': 48
}, {
  'Date': '2019-05-23',
  'Most used': 'LateNight',
  'Frequency': 1
}]

const screensByMonth = [{
  'Date': '2019-04-23',
  'Most used': 'Afternoon',
  'Frequency': 15
}, {
  'Date': '2019-04-24',
  'Most used': 'Afternoon',
  'Frequency': 38
}, {
  'Date': '2019-04-25',
  'Most used': 'Night',
  'Frequency': 12
}, {
  'Date': '2019-04-26',
  'Most used': 'Night',
  'Frequency': 38
}, {
  'Date': '2019-04-27',
  'Most used': 'Night',
  'Frequency': 27
}, {
  'Date': '2019-04-28',
  'Most used': 'Afternoon',
  'Frequency': 38
}, {
  'Date': '2019-04-29',
  'Most used': 'Afternoon',
  'Frequency': 44
}, {
  'Date': '2019-04-30',
  'Most used': 'Afternoon',
  'Frequency': 38
}, {
  'Date': '2019-05-01',
  'Most used': 'LateNight',
  'Frequency': 24
}, {
  'Date': '2019-05-02',
  'Most used': 'LateNight',
  'Frequency': 3
}, {
  'Date': '2019-05-04',
  'Most used': 'Afternoon',
  'Frequency': 19
}, {
  'Date': '2019-05-05',
  'Most used': 'Afternoon',
  'Frequency': 20
}, {
  'Date': '2019-05-06',
  'Most used': 'Afternoon',
  'Frequency': 15
}, {
  'Date': '2019-05-07',
  'Most used': 'Night',
  'Frequency': 18
}, {
  'Date': '2019-05-08',
  'Most used': 'Evening',
  'Frequency': 20
}, {
  'Date': '2019-05-09',
  'Most used': 'LateNight',
  'Frequency': 8
}, {
  'Date': '2019-05-10',
  'Most used': 'Evening',
  'Frequency': 25
}, {
  'Date': '2019-05-11',
  'Most used': 'Night',
  'Frequency': 18
}, {
  'Date': '2019-05-12',
  'Most used': 'LateNight',
  'Frequency': 12
}, {
  'Date': '2019-05-13',
  'Most used': 'Night',
  'Frequency': 22
}, {
  'Date': '2019-05-14',
  'Most used': 'Afternoon',
  'Frequency': 36
}, {
  'Date': '2019-05-15',
  'Most used': 'Afternoon',
  'Frequency': 35
}, {
  'Date': '2019-05-16',
  'Most used': 'LateNight',
  'Frequency': 33
}, {
  'Date': '2019-05-17',
  'Most used': 'Evening',
  'Frequency': 43
}, {
  'Date': '2019-05-18',
  'Most used': 'Morning',
  'Frequency': 45
}, {
  'Date': '2019-05-19',
  'Most used': 'Night',
  'Frequency': 26
}, {
  'Date': '2019-05-20',
  'Most used': 'Afternoon',
  'Frequency': 38
}, {
  'Date': '2019-05-21',
  'Most used': 'Night',
  'Frequency': 50
}, {
  'Date': '2019-05-22',
  'Most used': 'Morning',
  'Frequency': 48
}, {
  'Date': '2019-05-23',
  'Most used': 'LateNight',
  'Frequency': 1
}]