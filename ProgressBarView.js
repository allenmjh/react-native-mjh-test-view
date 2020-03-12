import React, { Component } from "react";
import {
    View,
    StyleSheet,
    ART,
    Dimensions,
    Text,
    Image
} from "react-native";
import PropTypes from 'prop-types';

const { Surface } = ART;
const { width } = Dimensions.get('window');
const angle = 30;
const lineWidth = 10;
const propTypes = {
    surfaceWidth: PropTypes.number,
    surfaceHeight: PropTypes.number,
    percentage: PropTypes.number,
};
export default class ProgressBarView extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    getRadian(angle) {
        return Math.PI * angle / 180;
    }

    render() {
        const { surfaceWidth, surfaceHeight, percentage } = this.props;
        //起始弧线
        let startRadian = this.getRadian(angle);
        //没百分比增加的弧度
        let everyRadian = (360 - angle * 2) / 100;
        //当前的角度
        let currentAngle = everyRadian * percentage + angle;
        //半径
        let radius = surfaceWidth / 2 - lineWidth - 5;
        //起始点坐标
        let startPointX = surfaceWidth / 2 - radius * Math.sin(startRadian);
        let startPointY = surfaceWidth / 2 + radius * Math.cos(startRadian);
        //背景弧形路线
        const backgroundPath = new ART.Path();
        //进度弧形路线
        const progressPath = new ART.Path();
        //点的位置
        const pointPath = new ART.Path();
        const pointPath1 = new ART.Path();
        const pointPath2 = new ART.Path();
        backgroundPath.moveTo(startPointX, startPointY)
            .arc(radius * Math.sin(startRadian), -(radius + radius * Math.cos(startRadian)), radius)
            .arc(radius * Math.sin(startRadian), radius + radius * Math.cos(startRadian), radius);
        let endPointX;
        let endPointY;
        if (percentage <= 60) {
            let currentRadian = this.getRadian(currentAngle);
            endPointX = surfaceWidth / 2 - radius * Math.sin(currentRadian);
            endPointY = surfaceWidth / 2 + radius * Math.cos(currentRadian);
            progressPath.moveTo(startPointX, startPointY)
                .arc(-(startPointX - endPointX), -(startPointY - endPointY), radius);
        }
        if (percentage > 60) {
            let newAngle = currentAngle - 180;
            let newRadian = this.getRadian(newAngle);
            endPointX = surfaceWidth / 2 + radius * Math.sin(newRadian);
            endPointY = surfaceWidth / 2 - radius * Math.cos(newRadian);
            progressPath.moveTo(startPointX, startPointY)
                .arc(radius * Math.sin(startRadian), -(radius * Math.cos(startRadian) + radius), radius)
                .arc(radius * Math.sin(newRadian), radius - radius * Math.cos(newRadian), radius);
        }
        pointPath.moveTo(endPointX, endPointY + 10).arc(0, -20, 10).arc(0, 20, 10);
        pointPath1.moveTo(endPointX, endPointY + 11).arc(0, -22, 11).arc(0, 22, 11);
        pointPath2.moveTo(endPointX, endPointY + 13).arc(0, -26, 13).arc(0, 26, 13);
        return (
            <View
                style={styles.containerStyle}
            >
                <ART.Surface
                    width={surfaceWidth}
                    height={surfaceHeight}
                    style={{ backgroundColor: 'white' }}
                >
                    <ART.Shape
                        d={backgroundPath}
                        stroke={'#adacad'}
                        strokeWidth={lineWidth}
                    />
                    <ART.Shape
                        d={progressPath}
                        stroke={'#F5A623'}
                        strokeWidth={lineWidth}
                    />
                    <ART.Shape
                        d={pointPath2}
                        fill={'#F5A623'}
                    />
                    <ART.Shape
                        d={pointPath1}
                        fill={'white'}
                    />
                    <ART.Shape
                        d={pointPath}
                        fill={'#F5A623'}
                    />
                </ART.Surface>
                <View style={styles.viewStyle}>
                    <Image
                        source={require('./electricity.png')}
                        style={{ width: 50, height: 50, marginBottom: 5 }}
                        resizeMode={'contain'}
                    />
                    <Text style={styles.textStyle}>{`${percentage}%`}</Text>
                </View>
            </View>
        );
    }
}

ProgressBarView.propTypes = propTypes;

ProgressBarView.defaultProps = {
    surfaceWidth: width / 2,
    surfaceHeight: width / 2,
    percentage: 50,
};

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: 'white',
        alignItems: 'center'
    },
    viewStyle: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textStyle: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#F5A623'
    }
});