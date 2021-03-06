
import React, { Component } from 'react';
import { Modal, View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import { Retest } from '../../retest';
import { Storage } from '../../../helper/storage/localMongodb';
import { Signature, GlobalStyles } from '../../common';
import { globalStyles } from '../../common/GlobalStyles';

class AbdominalPushUpsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.examName,
      classNumber: "",
      number: "",
      result: 0,
      retest: false,
      showSignatureWindow: false,
    };
  }

  onChangenumber = (val) => {
    this.setState((prevState) => {
      return {
        ...this.state,
        number: val,
      }
    });
  }

  onChangeClassNumber = (val) => {
    this.setState((prevState) => {
      return {
        ...this.state,
        classNumber: val,
      }
    });
  }

  clearFields = () => {
    this.setState((prevState) => {
      return {
        ...this.state,
        classNumber: "",
        number: "",
        result: 0,
      }
    });
  }

  incrementResult = () => {
    this.setState((prevState) => {
      return {
        ...this.state,
        result: this.state.result + 1,
      }
    });
  };

  decrementResult = () => {
    this.setState((prevState) => {
      return {
        ...this.state,
        result: (this.state.result - 1 < 0) ? 0 : this.state.result - 1,
      }
    });
  };

  setRetestValue = (val) => {
    this.setState((prevState) => {
      return {
        ...this.state,
        retest: val,
      };
    });
  }

  saveCandidateExamData = (image) => {
    const storage = new Storage();
    const { name, classNumber, number, result, retest } = this.state;
    const day = ((new Date).getDate() > 9) ? (new Date).getDate() : '0' + (new Date).getDate().toString();
    const month = ((new Date).getMonth() + 1 > 9) ? (new Date).getMonth() + 1 : '0' + ((new Date).getMonth() + 1).toString();
    const year = (new Date).getFullYear();
    console.log({ name, classNumber: parseInt(classNumber), number: parseInt(number), result: parseInt(result), retest, examDate: `${day}/${month}/${year}`, examTime: Date.now(), candidateSignature: image.encoded });

    storage.saveOnLocalStorage({ name, classNumber: parseInt(classNumber), number: parseInt(number), result: parseInt(result), retest, examDate: `${day}/${month}/${year}`, examTime: Date.now(), candidateSignature: image.encoded });
    this.setState((prevState) => {
      return {
        ...this.state,
        number: "",
        result: 0
      }
    });
  }

  onSave(result) {
    if(result != null){
      this.setState((prevState) => {
        return { showSignatureWindow: false }
      }, () => this.saveCandidateExamData(result) );
    } else {
      this.setState((prevState) => {
        return { showSignatureWindow: false }
      });
      Alert.alert('Prova nao foi salva, candidato deve assinar');
    }
  }

  getSignature = () => {
    this.setState((prevState) => {
      return {
        ...this.state,
        showSignatureWindow: true,
      }
    });
  }

  saveImage() {
    this.refs.signature.saveSign();
  }

  render() {
    return (
      <View style={[styles.AbdominalPushUpsExamContainer]}>

        <Modal visible={this.state.showSignatureWindow} animationType="slide"
          transparent={false}
          onRequestClose={() => { this.onSignatureClose }}>
          <View style={[styles.container, { marginTop: 20, marginLeft: 'auto', marginRight: 'auto' }]}>
            <Text style={globalStyles.formatTitle}>Assinatura do candidato</Text>
            <View style={styles.signatureBox}>
              <Signature ref='signature' onSave={this.onSave.bind(this)} />
            </View>
            <View style={styles.buttonContainer}>
              <Button buttonStyle={globalStyles.formatButtonMedium} title='Limpar' onPress={() => { this.refs.signature.resetSign(); }} />
              <View style={{ width: 20 }} />
              <Button buttonStyle={globalStyles.formatButtonMedium} title='Salvar' onPress={ this.saveImage.bind(this) } />
            </View>
          </View>
        </Modal>
        <View style={[styles.containers, styles.nameContainer]}>
          <Text style={globalStyles.formatTitle}>{'Teste de ' + this.props.examName}</Text>
        </View>
        <View style={[styles.containers, styles.evaluatedPersonContainer]}>
          <Text style={globalStyles.formatTextDark}>Turma do Avaliado:</Text>
          <TextInput 
            style={[globalStyles.inputNumber, globalStyles.formatTextDark]} 
            value={this.state.classNumber} 
            onChangeText={this.onChangeClassNumber}
            keyboardType='numeric'>
          </TextInput>
          <Text style={globalStyles.formatTextDark}>Número do Avaliado:</Text>
          <TextInput 
            style={[globalStyles.inputNumber, globalStyles.formatTextDark]} 
            value={this.state.number} 
            onChangeText={this.onChangenumber}
            keyboardType='numeric'>
          </TextInput>
        </View>
        <View style={[styles.containers, styles.examDataContainer]}>
        <Button fontSize={22} buttonStyle={[globalStyles.formatButton, { backgroundColor: 'red'}]} title='-' onPress={this.decrementResult}/>
          <View style={styles.marginBetweenButtons} />
          <Text
            style={[styles.formatHeightValue, styles.formatText]}
            >{this.state.result}
          </Text>
          <View style={styles.marginBetweenButtons} />
          <Button fontSize={22} buttonStyle={[globalStyles.formatButton,globalStyles.backgroundGreen]} title='+' onPress={this.incrementResult} />
        </View>
        <View style={[styles.containers, styles.retestContainer]}>
          <Retest changeRestestValue={this.setRetestValue}></Retest>
          <Text>Reteste</Text>
        </View>
        <View style={[styles.containers, styles.buttonContainer]}>
          <Button fontSize={22} buttonStyle={[globalStyles.formatButtonMedium , globalStyles.backgroundGreen] } title='Salvar' onPress={this.getSignature} />
          <View style={styles.marginBetweenButtons} />
          <Button fontSize={22} buttonStyle={[ globalStyles.formatButtonMedium ]} title='Limpar' onPress={this.clearFields} />
        </View>
      </View>
    );
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
  AbdominalPushUpsExamContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
  },
  nameContainer: {
    flex: 1,
    marginTop: -20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  evaluatedPersonContainer: {
    flex: 1,
    paddingRight: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  number: {
    width: '5%',
    justifyContent: 'center',
    textAlign: 'center',
  },
  examDataContainer: {
    //marginBottom: 200,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formatHeightValue: {
    width: '7%',
    borderColor: 'black',
    textAlign: 'center',
  },
  retestContainer: {
    flex: 1,
    //marginBottom: 140,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    //marginTop: -200,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 10,
  },
  marginBetweenButtons: {
    flex: 0.1,
  },
  formatText: {
    color: 'black',
    fontSize: 18,
  }
});

export { AbdominalPushUpsComponent };
