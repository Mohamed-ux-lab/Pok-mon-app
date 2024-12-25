import {View, ViewProps, ViewStyle} from "react-native";

type Props = ViewProps &{
    gap?: number
}

export function Row({style, gap, ...rest}: Props) {
    return <View style={[rowStyles, style , gap ?{gap: gap}: undefined]} {...rest} />
}

const rowStyles = {
    flexDirection: "row",
    flex: 0,
    alignItems: "center",
} satisfies ViewStyle