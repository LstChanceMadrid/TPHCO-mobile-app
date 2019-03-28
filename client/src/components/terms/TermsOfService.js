import React, {Component} from 'react';
import { Text, Linking, ScrollView, View} from 'react-native';
import { styles } from './styles/styles'


export default class TermsOfService extends Component {
  
  render() {
    return (
      <ScrollView style={styles.termsContainer}>
        <Text style={styles.copyRight}>
          Copyright 2018, Tudor, Pickering, Holt & Co.
        </Text>
        
        <View style={styles.termsParagraphContainer}>
          <Text style={styles.terms}>
            The information contained in this update is based on sources considered to be reliable but is not represented to be complete and its accuracy is not guaranteed. This update is designed to provide market commentary only. This update does not constitute an offer to sell or a solicitation of an offer to buy any securities. Nothing contained in this update is intended to be a recommendation of a specific security or company nor is any of the information contained herein intended to constitute an analysis of any company or security reasonably sufficient to form the basis for any investment decision. Tudor, Pickering, Holt & Co., and its officers, directors, shareholders, employees and affiliates and members of their families may have positions in any securities mentioned and may buy or sell such securities before, after or concurrently with the publication of this update. In some instances, such investments may be inconsistent with the views expressed herein. Tudor, Pickering, Holt & Co. may, from time to time, perform or solicit investment banking or other services for or from a company, person or entities mentioned in this update. Additional important disclosures, including disclosures regarding companies covered by TPH’s research department, may be found at <Text style={styles.link} onPress={() => Linking.openURL('https://www.tphco.com/disclosures/')}>www.tphco.com/Disclosure</Text>. Tudor, Pickering, Holt & Co. (TPH) is the global brand name for Tudor, Pickering, Holt & Co. Securities, Inc., Tudor Pickering Holt & Co Advisors LP, Tudor, Pickering, Holt & Co. Securities – Canada, ULC and their affiliates worldwide.
          </Text>
        </View>

        <Text style={styles.FINRA}>
          Institutional Communication Only. Under FINRA Rule 2210, this communication is deemed institutional sales material and it is not meant for distribution to retail investors. Recipients should not forward this communication to a retail investor.
        </Text>
      </ScrollView>
    );
  }
}