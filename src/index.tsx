import React, { FC, ReactElement } from 'react';

import { View, Text, ViewStyle, TextStyle } from 'react-native';

export interface StepperProps {
	activeItems: number[];
	content: ReactElement[];
	wrapperStyle?: ViewStyle;
	stepStyle?: ViewStyle;
	stepTextStyle?: TextStyle;
	showButton?: boolean;
	activeStepBGColor?: string;
	inactiveStepBGColor?: string;
}

const Stepper: FC<StepperProps> = props => {
	const {
		activeItems,
		content,
		wrapperStyle,
		stepStyle,
		stepTextStyle,
		activeStepBGColor = 'green',
		inactiveStepBGColor = 'black'
	} = props;

	return (
		<View style={[wrapperStyle, { marginBottom: 45 }]}>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'center',
					alignItems: 'center'
				}}>
				{content.map((_, i) => {
					return (
						<React.Fragment key={i}>
							{i !== 0 && (
								<View
									style={{
										flex: 1,
										height: 2,
										backgroundColor:
											activeItems[i] === i
												? activeStepBGColor
												: inactiveStepBGColor
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
										opacity: activeItems[i] === i ? 1 : 0.5
									},
									{
										...stepStyle,
										backgroundColor:
											activeItems[i] === i
												? activeStepBGColor
												: inactiveStepBGColor
									}
								]}>
								{activeItems[i] === i ? (
									<Text
										style={[
											{
												color: 'white'
											},
											stepTextStyle
										]}>
										&#10003;
									</Text>
								) : (
									<Text
										style={[
											{
												color: 'white'
											},
											stepTextStyle
										]}>
										{i + 1}
									</Text>
								)}
								<View
									style={{
										position: 'absolute',
										top: 45,
										width: 60,
										left: 0,
										right: 0
									}}>
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
