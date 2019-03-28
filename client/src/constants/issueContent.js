import { FlatList, Image, Text, View } from 'react-native'



image = (issue, x) => {
    let image = `image${x}`
    if (issue[image] !== null) {
      return <View><Image  source={{uri: issue[image]}} /></View>
    }
  }

  paragraph = (issue, x) => {
    let paragraph = `paragraph${x}`

    if (issue[paragraph] !== null) {
      return <Text style={styles.paragraph}>{issue[paragraph]}</Text>
    }
  }