import React, {FC, useState, ReactElement} from 'react';
import { useEffect } from 'react';
import {
  View,
  Text,
  ViewStyle,
  TextStyle,
} from 'react-native';

export interface StepperProps {
  active: number;
  content: ReactElement[];
  wrapperStyle?: ViewStyle;
  stepStyle?: ViewStyle;
  stepTextStyle?: TextStyle;
  showButton?: boolean;

  activeStepBGColor?: string;
  inactiveStepBGColor?: string;
}

const search = (keyName: number, myArray: number[]): boolean => {
  let value = false;
  myArray.map((val) => {
    if (val === keyName) {
      value = true;
    }
  });
  return value;
};

const Stepper: FC<StepperProps> = (props) => {
  const {
    active,
    content,
    wrapperStyle,
    stepStyle,
    stepTextStyle,
    activeStepBGColor = "green",
    inactiveStepBGColor = "black"
  } = props;
  const [step, setStep] = useState<number[]>([active]);

  useEffect(() => {
    setStep((prev) => [...prev, active]);

    return () => setStep([-1])
  }, [active])

  return (
    <View style={[wrapperStyle, {marginBottom: 45}]}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {content.map((_, i) => {
          return (
            <React.Fragment key={i}>
                            {i !== 0 && (
                <View
                  style={{
                    flex: 1,
                    height: 2,
                    backgroundColor: search(i, step) ? activeStepBGColor : inactiveStepBGColor,
                  }}
                />
              )}
              <View
                style={[
                  {
                    width: 45,
                    height: 45,
                    borderRadius: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    opacity: search(i, step) ? 1 : 0.5
                  },
                  {...stepStyle, backgroundColor: search(i, step) ? activeStepBGColor : inactiveStepBGColor}
                ]}>
                {search(i, step) ? (
                  <Text
                    style={[
                      {
                        color: 'white',
                      },
                      stepTextStyle,
                    ]}>
                    &#10003;
                  </Text>
                ) : (
                  <Text
                    style={[
                      {
                        color: 'white',
                      },
                      stepTextStyle,
                    ]}>
                    {i + 1}
                  </Text>
                )}
                <View style={{position: 'absolute', top: 45, width: 55, left: 0, right: 0}}>
                {content[i]}
              </View>
              </View>
            </React.Fragment>
          );
        })}
      </View>
    </View>
  );
};

export default Stepper;
