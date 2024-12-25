import {Image, Pressable, StyleSheet, View, ViewStyle} from "react-native";
import {Cards} from "@/components/Cards";
import {ThemedText} from "@/components/ThemedText";
import {useThemeColor} from "@/hooks/useThemeColor";
import {Link} from "expo-router";
import {getPokemonArtwork} from "@/functions/pokemon";

type Props = {
    style: ViewStyle,
    id: number,
    name: string,
}

export function PokemonCard ({style, id, name}: Props) {
    const colors = useThemeColor()
    return <Link href={{pathname: "/pokemon/[id]", params: {id: id}}} asChild>
        <Pressable style={style}>
            <Cards style={styles.card}>
                <View style={[styles.shadow, {backgroundColor: colors.greyBackground}]}/>
                <ThemedText style={styles.id} variant="caption" color="greyMedium">#{id.toString().padStart(3, '0')}</ThemedText>
                <Image
                    source={{uri: getPokemonArtwork(id)}}
                    width={72}
                    height={72}
                />
                <ThemedText>{name}</ThemedText>
            </Cards>
        </Pressable>
    </Link>
}

const styles = StyleSheet.create({
    card: {
        position: "relative",
        alignItems: "center",
        padding: 4
    },
    id: {
        alignSelf: "flex-end",
    },
    shadow: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 44,
        borderRadius: 7,
    }
})