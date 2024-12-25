import {StyleSheet, Text, TextProps} from "react-native";
import {useThemeColor} from "@/hooks/useThemeColor";
import {Color} from "@/constants/Color";

const styles = StyleSheet.create({
    body3: {
        fontSize: 10,
        lineHeight: 16,
    },
    caption: {
        fontSize: 8,
        lineHeight: 12,
    },
    headline: {
        fontSize: 24,
        lineHeight: 32,
        fontWeight: 'bold',
    },
    subtitle1: {
        fontSize: 14,
        lineHeight: 16,
        fontWeight: 'bold'
    },
    subtitle2: {
        fontSize: 12,
        fontWeight: 'bold',
        lineHeight: 16,
    },
    subtitle3: {
        fontSize: 10,
        lineHeight: 16,
        fontWeight: 'bold'
    }
})


type Props = TextProps & {
    variant?: keyof typeof styles,
    color?: keyof typeof Color["light"]
}

export function ThemedText({variant, color, style, ...rest}: Props) {
    const colors = useThemeColor()
    return <Text style={[styles[variant ?? 'body3'], {color: colors[color ?? "greyDark"]}, style]} {...rest}/>
}