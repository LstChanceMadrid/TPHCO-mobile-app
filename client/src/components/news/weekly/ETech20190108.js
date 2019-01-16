import React, {Component} from 'react';
import {FlatList, StyleSheet, View, Text} from 'react-native';


class ETech20190108 extends Component {

    render() {
        return (
            <View style={styles.container}>
            <View style={styles.storyWrapper}>
                <Text style={styles.title}>Survival Planning
</Text>
                <Text style={{color: 'rgba(200, 200, 200, 1)', paddingBottom: 10}}>By <Text style={styles.author}>John Gibson</Text></Text>
                <Text style={styles.paragraph}>One of the four dilemmas we face each day concerns the tradeoff between short and long term. In a down market, we often face the challenge of reducing sufficient cost immediately to enhance survivability in the long term. Many smaller technology companies face this challenge currently. The decision for first time CEOs (for every CEO) can be gut wrenching. Do we fire half the staff, do we ask everyone to defer compensation, do we lower compensation for some or for everyone, which people can we not afford to lose, do we replace some of the compensation with equity in the company, do we try to execute a down round financing, how should we weight the revenue forecast versus cost reductions, how much weight should be placed on projects not currently yielding revenue,  when will the money run out, how long do we need to survive to see another good market, what is it going to take to close the current deals that are pending, can we afford to add debt, do we need to merge to survive,   are we focused on collecting receivables, ……….?{'\n'}{'\n'}
                A few suggestions:</Text>
                <View style={styles.list}>
                <FlatList 
                    data={[
                        {i:1, key: 'Have an intense sense of urgency'},
                        {i:2, key: 'Find someone to act as a sounding board that can be impartial/objective'},
                        {i:3, key: 'Strive for a realistic (then dial it back 10% to 15%) estimate of how long you have left given what you know for certain{'},
                        {i:4, key: 'Develop an estimate of how long it will be before the market turns up (increase time by 15% to 20%): set this as the timeframe for your Survival Plan'},
                        {i:5, key: 'With HR (if no HR, with the person that knows the organization/people the best), develop numerous working models for how to reduce costs and preserve critical personnel'},
                        {i:6, key: 'Eliminate as much (all if possible) work not tied to revenue in the short term'},
                        {i:7, key: 'Develop a strategy to inform suppliers that you intend to slow payments'},
                        {i:8, key: 'Have a very ugly revenue forecast meeting and get a pessimistic, realistic, and optimistic forecast and use the pessimistic forecast for cash planning purposes'},
                        {i:9, key: 'Assign clear accountability for closing all deals in the pipeline'},
                        {i:10, key: 'Assign clear accountability for collections'},
                        {i:11, key: 'Ask yourself, why are we in this high cost real estate and does that ever make sense?'},
                        {i:12, key: 'Eliminate free everything for employees, this is an important message during tightening periods and they will prefer pay over Dasani'},
                        {i:13, key: 'As CEO – set the example'},
                        {i:14, key: 'Schedule regular communications with customers, employees, board members, lenders, suppliers, regulators, shareholders ……. ( all impacted stakeholders)'},
                        {i:15, key: 'Get advice on strategic alternatives: down round, debt, merger…….'},
                        {i:16, key: 'With all this done – relax – you have done your job – control everything you can and roll with the punches'},
                        {i:17, key: 'Remember, your best friends and greatest sense of accomplishment results from surviving a tough trial'}
                    ]} 
                    renderItem={({item}) => <Text style={styles.listItem}><Text style={styles.index}>{item.i}. </Text>{item.key}</Text>}
                />
                </View>

                <Text style={styles.paragraph}>I could write a chapter on each of the 17 bullets above. In our industry we have numerous leaders that have survived several down cycles successfully. Welcome to the resilience industry.</Text>

            </View>
            </View>
        )
    }
}


export default ETech20190108

const styles = StyleSheet.create({
    container : {
        backgroundColor: 'rgba(106, 109, 142, 1)',
        padding: 10,
    },
    title: {
        color: 'rgba(125, 251, 250, 1)',
        fontWeight: 'bold',
        fontSize: 15,
        paddingBottom: 12
    },
    author: {
        color: 'rgba(255, 150, 100, 1)',
        fontSize: 13
    },
    paragraph : {
        fontSize : 12,
        color: 'white'

    },
    storyWrapper: {
        borderBottomWidth: 2,
        borderBottomColor: 'white',
        paddingBottom: 10
    },
    listItem : {
        fontSize : 12,
        color: 'white'

    },
    list: {
        padding: 10
    },
    index : {
        fontSize : 14,
        fontWeight: 'bold',
        color: 'white',
    }
})