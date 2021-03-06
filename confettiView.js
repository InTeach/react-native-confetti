import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Animated
} from 'react-native';

import Confetti from "./confetti.js";

class ConfettiView extends Component {
  constructor(props) {
      super(props);

      this.state = {confettis: []};

      this.confettiIndex = 0;
      this.stop = false;
  }

  startConfetti() {
       let {confettis} = this.state;
       let {confettiCount, timeout} = this.props;
       if(this.confettiIndex < confettiCount) {
         setTimeout(() => {
           confettis.push({key: this.confettiIndex});
           this.confettiIndex++;
           if (!this.stop) {
             this.setState({confettis});
             this.startConfetti();
           }
         }, timeout);
       }
  }

  stopConfetti() {
    this.stop = true;
  }

  removeConfetti(key) {
      if (!this.stop) {
        let {confettis} = this.state;
        let {confettiCount} = this.props;
        let index = confettis.findIndex(confetti => {return confetti.key === key});
        confettis.splice(index, 1);
        this.setState({confettis});
        if(key === confettiCount - 1) {
          this.confettiIndex = 0;
        }
      }
  }

  render() {
       let {confettis} = this.state;
       let {...otherProps} = this.props
       if (this.stop) {
         return <View />;
       } else {
        return <View style={styles.container}>
          {confettis.map(confetti => {
              return <Confetti key={confetti.key} index={confetti.key} onComplete={this.removeConfetti.bind(this, confetti.key)} {...otherProps}/>
          })}
        </View>
       }
  }
}

ConfettiView.defaultProps = {
   confettiCount: 100,
   timeout: 30
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0
  }
});

export default ConfettiView;
