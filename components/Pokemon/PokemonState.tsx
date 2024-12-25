import {StyleSheet, View, ViewProps} from "react-native";
import {useThemeColor} from "@/hooks/useThemeColor";
import {Row} from "@/components/Row";
import {ThemedText} from "@/components/ThemedText";
import Animated, {useAnimatedStyle, useSharedValue, withSpring} from "react-native-reanimated";
import {useEffect} from "react";

type Props = ViewProps & {
    name: string,
    value: number,
    color: string,
}

export function stateShortName(name: string): string {
    return name.replace("special", "S")
        .replace("-", "")
        .replace("attack", "ATK")
        .replace("defense", "DEF")
        .replace("speed", "SPD")
        .toUpperCase()
}

export function PokemonState({ style, name, value, color, ...rest }: Props) {
    const colors = useThemeColor()
    const sharedValue = useSharedValue(value)
    const barInnerStyle = useAnimatedStyle(() => {
        return {
            flex: sharedValue.value,
        }
    })
    const barBackgroundStyle = useAnimatedStyle(() => {
        return {
            flex: 255 - sharedValue.value,
        }
    })

    useEffect(() => {
        sharedValue.value = withSpring(value)
    }, [value])

    return <Row gap={8} style={[style, styles.root]}>
        <View style={[styles.name, {borderColor: colors.greyLight}]}>
            <ThemedText variant="subtitle3" style={{color: color}}>
                {stateShortName(name)}
            </ThemedText>
        </View>
        <View style={styles.number}>
            <ThemedText>{value.toString().padStart(3, "0")}</ThemedText>
        </View>
        <Row style={styles.bar}>
            <Animated.View style={[styles.barInner, {backgroundColor: color}, barInnerStyle]}/>
            <Animated.View style={[styles.barBackground, {backgroundColor: color}, barBackgroundStyle]}/>
        </Row>
    </Row>
}

const styles = StyleSheet.create({
    root: {},
    name: {
        width: 40,
        paddingRight: 8,
        borderRightWidth: 1,
        borderStyle: "solid",
    },
    number: {
        width: 23,
    },
    bar: {
        flex: 1,
        borderRadius: 20,
        height: 4,
        overflow: "hidden",
    },
    barInner: {
        height: 4,
    },
    barBackground: {
        height: 4,
        opacity: 0.24,
    },
})