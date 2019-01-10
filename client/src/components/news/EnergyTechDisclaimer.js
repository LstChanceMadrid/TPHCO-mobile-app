import React, { Component } from 'react'
import {Image, Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native'

export default class EnergyTechDisclaimer extends Component {
  constructor(props) {
      super(props)
      this.state = {
          ...this.state
      }
  }
  
  render() {

      return(
      <View style={styles.container}>
          <View style={styles.disclaimerWrapper}>
              <Text style={styles.disclaimer}>Copyright 2018, Tudor, Pickering, Holt & Co. The information contained in this update is based on sources considered to be reliable but is not represented to be complete and its accuracy is not guaranteed. This update is designed to provide market commentary only.  This update does not constitute an offer to sell or a solicitation of an offer to buy any securities. Nothing contained in this update is intended to be a recommendation of a specific security or company nor is any of the information contained herein intended to constitute an analysis of any company or security reasonably sufficient to form the basis for any investment decision. Tudor, Pickering, Holt & Co., and its officers, directors, shareholders, employees and affiliates and members of their families may have positions in any securities mentioned and may buy or sell such securities before, after or concurrently with the publication of this update. In some instances, such investments may be inconsistent with the views expressed herein. Tudor, Pickering, Holt & Co. may, from time to time, perform or solicit investment banking or other services for or from a company, person or entities mentioned in this update. Additional important disclosures, including disclosures regarding companies covered by TPH’s research department, may be found at <Text style={styles.link} onPress={() => Linking.openURL('https://www.tphco.com/disclosures/')}>www.tphco.com/Disclosure</Text>. Tudor, Pickering, Holt & Co. (TPH) is the global brand name for Tudor, Pickering, Holt & Co. Securities, Inc., Tudor Pickering Holt & Co Advisors LP, Tudor, Pickering, Holt & Co. Securities – Canada, ULC and their affiliates worldwide.</Text>

              <Text style={styles.disclaimer}>Institutional Communication Only.  Under FINRA Rule 2210, this communication is deemed institutional sales material and it is not meant for distribution to retail investors.  Recipients should not forward this communication to a retail investor.</Text>
          </View>

            <Text style={styles.emailLinks}><Text style={styles.link} onPress={() => Linking.openURL('https://www.tphco.com/disclosures/')}>unsubscribe from all TPH Investment Banking emails</Text> | <Text style={styles.link} onPress={() => Linking.openURL('https://www.tphco.com/disclosures/')}>update subscription preferences</Text></Text>
            <Text style={styles.copyRight}>Copyright © 2018, All rights reserved.</Text>
            <Text style={styles.mailingAddressTitle}>Our mailing address is:</Text>
            <Text style={styles.mailingAddress}>Tudor, Pickering, Holt & Co. Management, LLC{'\n'}1111 Bagby St Suite 4900{'\n'}Houston, Texas 77002
 </Text>
      </View>
      )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    disclaimerWrapper: {
        flex: 1,
        paddingBottom: 10,
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderTopColor: 'white'
    },
    disclaimer: {
        paddingTop: 10,
        fontSize: 9,
        color: 'rgba(150, 150, 150, 1)',
        textAlign: 'justify'
    },
    link: {
        fontSize: 9,
        color: "orange",
        textAlign: 'center'
    },
    emailLinks: {
        fontSize: 9,
        paddingTop: 10,
        color: 'rgba(150, 150, 150, 1)',
        textAlign: 'center'
    },
    copyRight: {
        color: 'white',
        fontSize: 9,
        fontStyle: 'italic',
        textAlign: 'center'
    },
    mailingAddressTitle: {
        fontSize: 9,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingTop: 10,
        color: 'white'
    },
    mailingAddress: {
        fontSize: 9,
        color: 'white',
        textAlign: 'center',
        paddingTop: 10
    }
})