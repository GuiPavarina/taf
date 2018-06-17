import React, { Component } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { Signature } from '../common';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Retest} from '../retest';
import { globalStyles } from '../common/GlobalStyles';
import { Button } from 'react-native-elements';

class FiftyMetersRun extends Component {

  constructor(props)
  {
    super(props);
    this.state = {
      isDateTimePickerVisible: false,
      evaluatedPersonNumber: '',
      seconds: '0',
      miliseconds: '0',
      showSignatureWindow: false,
    };
  }

  // zeroFill( number, width )
  // {
  //   width -= number.toString().length;
  //   if ( width > 0 )
  //   {
  //     return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
  //   }
  //   return number + ""; // always return a string
  // }

  incrementCounter(type)
  {
    var timerCounter = Object.freeze({"seconds":2, "miliseconds":3});
    switch(type)
    {
      case timerCounter.seconds:
      this.setState((prevState) => {
        return {
          ...this.state,
          seconds: (Number(this.state.seconds) + 1).toString(),
        }
      });
      break;
      case timerCounter.miliseconds:
      this.setState((prevState) => {
        return {
          ...this.state,
          miliseconds: (Number(this.state.miliseconds) + 1).toString(),
        }
      });
      break;
      default:
      console.log('erro');
      break;
    }
  }

  decrementCounter(type)
  {
    var timerCounter = Object.freeze({"seconds":2, "miliseconds":3});
    switch(type)
    {
      case timerCounter.seconds:
      this.setState((prevState) => {
        return {
          ...this.state,
          seconds: ((Number(this.state.seconds) - 1) < 0 ? 0 : Number(this.state.seconds) - 1).toString(),
        }

      });
      break;
      case timerCounter.miliseconds:
      this.setState((prevState) => {
        return {
          ...this.state,
          miliseconds: ((Number(this.state.miliseconds) - 1) <= 0 ? 0 : Number(this.state.miliseconds) - 1).toString(),
        }
      });
      break;
      default:
      console.log('erro');
      break;
    }
  }

  onChangeEvaluatedPersonNumber = (val) => {
    this.setState((prevState) => {
      return {
        ...this.state,
        evaluatedPersonNumber: val,
      }
    });
  } 

  onChangeSecondsValue = (val) => {
    this.setState((prevState) =>
    {
      return{
        ...this.state,
        seconds: val,
      }
    });
  }  

  onChangeMilisecondsValue = (val) => {
    this.setState((prevState) =>
    {
      return{
        ...this.state,
        miliseconds: val,
      }
    });
  } 

  onSave(result){
    if(result != null)
    {

    }
  }

  onSignatureClose(){
    this.setState((prevState) =>
    {
      return{
        ...this.state,
        showSignatureWindow:false,
      }
    }
    );
    alert('Modal has been closed.');

  }

  render()
  {
    return (
      <View style={styles.container}>
        <View style={globalStyles.examNameContainer}>
          <Text style={globalStyles.formatTitle}>Teste dos 50 metros</Text>
        </View>
        <View style={[styles.container, {flexDirection:'row', marginTop:-20}]}>
          <Text style={globalStyles.formatTextDark}>
              Numero do candidato:
          </Text>
          <TextInput 
            style={[globalStyles.inputNumber, globalStyles.formatTextDark]} 
            value={this.state.evaluatedPersonNumber} 
            onChangeText={this.onChangeEvaluatedPersonNumber}
            keyboardType='numeric'>
          </TextInput>            
        </View>
        <View>
        <Modal visible={this.state.showSignatureWindow} animationType="slide"
          transparent={false}
          onRequestClose={() => { this.onSignatureClose }}>
          <View style={[styles.container, { marginTop: 20, marginLeft: 'auto', marginRight: 'auto' }]}>
            <Text style={globalStyles.formatTextDark}>Assinatura do candidato</Text>
            <View style={styles.signatureBox}>
              <Signature ref='signature' onSave={this.onSave.bind(this)} />
            </View>
            <View style={styles.buttonContainer}>
              <Button title='Limpar' onPress={() => { this.refs.signature.resetSign(); }} />
              <View style={{ width: 20 }} />
              <Button title='Salvar' onPress={() => { this.setState((prevState) => { return { showSignatureWindow: false } }); }} />
            </View>
          </View>
        </Modal>
        </View>
        <Text style={globalStyles.formatTextDark}> Tempo da corrida</Text>
        <Text> (SEGUNDOS : MILISSEGUNDOS)</Text>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flexDirection: 'column' }}>
            {/* <Button title=' + ' onPress={() => { this.incrementCounter(2) }} /> */}
            <TextInput 
              value={this.state.seconds} 
              style={ globalStyles.inputNumber } 
              keyboardType='numeric'
              onChangeText={this.onChangeSecondsValue} />
            {/* <Button title=' - ' onPress={() => { this.decrementCounter(2) }} /> */}
          </View>
          <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.formatText}> : </Text>
          </View>
          <View style={{ flexDirection: 'column' }}>
            {/* <Button title=' + ' onPress={() => { this.incrementCounter(3) }} /> */}
            <TextInput 
              value={this.state.miliseconds}
              style={globalStyles.inputNumber} 
              keyboardType='numeric'
              onChangeText={this.onChangeMilisecondsValue} />
            {/* <Button title=' - ' onPress={() => { this.decrementCounter(3) }} /> */}
          </View>
        </View>
        <View style={[styles.retestContainer]}>
          <Retest></Retest>
          <Text>Reteste</Text>
          <View style={{ width: 20 }} />
          <Button 
            title='Salvar'
            fontSize={22}
            buttonStyle={[ globalStyles.formatButtonMedium, globalStyles.backgroundGreen]}
            onPress={() => { this.setState((prevState) => { return { showSignatureWindow: true } }) }} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signatureBox: {
    marginTop:10,
    borderWidth: 1,
    borderRadius: 10,
    width: 550,
    height: 205,
  },
  retestContainer: {
    flex: 1,
    //marginBottom: 140,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formatText: {
    color: 'black',
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection:'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  addButton: {
    height: '100%',
    width:'100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputCandidateNumber: {
    color: 'black',
    width: 65
  }
});

export { FiftyMetersRun};