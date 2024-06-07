// interface DialogProps {
//   actions?: PopupButton[];
//   title?: string;
//   message?: string;
// }

// export const CommonDialog: React.FC<DialogProps> = ({actions = [], title, message}) => {
//   Log.d('CommonDialog');
//   const showAlert = () => {
//     Log.d('aaaaa');
//     const buttons: AlertButton[] = actions.map(button => ({
//       text: button.text ?? 'OK',
//       onPress: button.onPressed,
//     }));

//     Alert.alert(title!, message, buttons);
//   };

//   React.useEffect(() => {
//     Log.d('aaaaa');
//     showAlert();
//   }, []);

//   return null;
// };

// export const ModalScreen = () => {
//   const color = useTheme();
//   const {current} = useCardAnimation();

//   const navigation = useNavigation();

//   return (
//     <View
//       style={{
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//       }}>
//       <Pressable
//         style={[StyleSheet.absoluteFill, {backgroundColor: 'rgba(0, 0, 0, 0.5)'}]}
//         onPress={navigation.goBack}
//       />
//       <Animated.View
//         style={{
//           padding: 16,
//           width: '90%',
//           maxWidth: 400,
//           borderRadius: 3,
//           backgroundColor: color.getTheme.colorScheme.primary,
//           transform: [
//             {
//               scale: current.progress.interpolate({
//                 inputRange: [0, 1],
//                 outputRange: [0.9, 1],
//                 extrapolate: 'clamp',
//               }),
//             },
//           ],
//         }}>
//         <Text>
//           Mise en place is a French term that literally means “put in place.” It also refers to a
//           way cooks in professional kitchens and restaurants set up their work stations—first by
//           gathering all ingredients for a recipes, partially preparing them (like measuring out and
//           chopping), and setting them all near each other. Setting up mise en place before cooking
//           is another top tip for home cooks, as it seriously helps with organization. It’ll pretty
//           much guarantee you never forget to add an ingredient and save you time from running back
//           and forth from the pantry ten times.
//         </Text>
//         <View style={{alignItems: 'flex-end'}}>
//           <Button
//             title="Okay"
//             color={color.getTheme.colorScheme.secondary}
//             onPress={navigation.goBack}
//           />
//         </View>
//       </Animated.View>
//     </View>
//   );
// };
