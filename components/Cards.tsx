import {useColorScheme, View, ViewProps, ViewStyle} from "react-native";
import {Shadow} from "@/constants/Shadow";
import {useThemeColor} from "@/hooks/useThemeColor";

type Props = ViewProps & {}

export function Cards({style, ...rest}: Props) {
    const colors = useThemeColor()
    return <View style={[styles, {backgroundColor: colors.greyWhite}, style]} {...rest} />
}

const styles = {
    overflow: 'hidden',
    borderRadius: 8,
    ...Shadow.dp2
} satisfies ViewStyle