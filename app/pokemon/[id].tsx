import {useLocalSearchParams} from "expo-router/build/hooks";
import {Image, Pressable, StyleSheet, Text, View} from "react-native";
import {RootView} from "@/components/RootView";
import {Row} from "@/components/Row";
import {ThemedText} from "@/components/ThemedText";
import {useFetchQuery} from "@/hooks/useFetchQuery";
import {router} from "expo-router";
import {useThemeColor} from "@/hooks/useThemeColor";
import {Color} from "@/constants/Color";
import {basePokemonStat, formatSize, formatWeight, getPokemonArtwork} from "@/functions/pokemon";
import {Cards} from "@/components/Cards";
import {PokemonType} from "@/components/Pokemon/PokemonType";
import {PokemonSpec} from "@/components/Pokemon/PokemonSpec";
import {PokemonState} from "@/components/Pokemon/PokemonState";
import {Audio} from "expo-av"

export default function Pokemon () {
    const colors = useThemeColor()
    const params = useLocalSearchParams() as {id: string}
    const id = parseInt(params.id);
    const {data: pokemon} = useFetchQuery("/pokemon/[id]", {id: params.id})
    const {data: species} = useFetchQuery("/pokemon-species/[id]", {id: params.id})

    const mainType = pokemon?.types?.[0].type.name
    const colorType = mainType ? Color.type[mainType] : colors.tint
    const typePokemon = pokemon?.types ?? []
    const bio = species?.flavour_text_entries
        ?.find(({language}) => language.name == "en")
        ?.flavour_text.replaceAll("\n", ". ")
    const stats = pokemon?.stats ?? basePokemonStat

    const onImagePress = async () => {
        const cry = pokemon?.cries.latest
        if (!cry) {
            return;
        }
        const {sound} = await Audio.Sound.createAsync({
            uri: cry,
        }, {shouldPlay: true})
        sound.playAsync()
    }
    const onNext = () => {
        router.replace({pathname: "/pokemon/[id]", params: {id: Math.max(id - 1, 1)}})
    }
    const onPrevious = () => {
        router.replace({pathname: "/pokemon/[id]", params: {id: Math.min(id + 1, 151)}})
    }
    const isFirst = id == 1
    const isLast = id == 151

    return (
        <RootView backgroundColor={colorType}>
            <View>
                <Image
                    style={styles.pokeBall}
                    source={require("@/assets/images/pokeball_Big.png")}
                    height={208}
                    width={208}
                    />
                <Row style={styles.header}>
                    <Pressable onPress={router.back}>
                        <Row>
                            <Image source={require("@/assets/images/back.png")} width={32} height={32}/>
                            <ThemedText color="greyWhite" variant="headline">
                                {pokemon?.name}
                            </ThemedText>
                        </Row>
                    </Pressable>
                    <ThemedText color="greyWhite" variant="subtitle2">#{params.id.padStart(3, "0")}</ThemedText>
                </Row>


                <Cards style={[styles.card, {overflow: "visible"}]}>
                    <Row style={styles.imageRow}>
                        {isFirst ?
                            (<View style={{width: 24, height: 24}}></View>) :
                            <Pressable onPress={onNext}>
                                <Image width={24} height={24} source={require("@/assets/images/prev.png")}/>
                            </Pressable>
                        }
                        <Pressable onPress={onImagePress}>
                            <Image
                                style={styles.artwork}
                                source={{uri: getPokemonArtwork(params.id)}}
                                width={200}
                                height={200}
                            />
                        </Pressable>
                        {isLast ?
                            (<View style={{width: 24, height: 24}}></View>) :
                            <Pressable onPress={onPrevious}>
                                <Image width={24} height={24} source={require("@/assets/images/next.png")}/>
                            </Pressable>
                        }
                    </Row>
                    <Row gap={16}>
                        {typePokemon.map(
                            type => <PokemonType name={type.type.name} key={type.type.name} />
                        )}
                    </Row>

                    {/*{About}*/}

                    <ThemedText variant="subtitle1" style={{color: colorType}}>About</ThemedText>
                        <Row>
                            <PokemonSpec
                                style={{borderStyle: "solid", borderRightWidth: 1, borderColor: colors.greyLight}}
                                title={formatWeight(pokemon?.weight)}
                                description="Weight"
                                image={require("@/assets/images/weight.png")}
                                />
                            <PokemonSpec
                                style={{borderStyle: "solid", borderRightWidth: 1, borderColor: colors.greyLight}}
                                title={formatSize(pokemon?.heigth)}
                                description="Size"
                                image={require("@/assets/images/size.png")}
                            />
                            <PokemonSpec
                                title={pokemon?.moves
                                    .slice(0, 2)
                                    .map((m) => m.move.name)
                                    .join("\n")}
                                description="Moves"
                            />
                        </Row>
                        <ThemedText>{bio}</ThemedText>

                        {/*{Stats}*/}

                        <ThemedText variant="subtitle1" style={{color: colorType}}>Base Stats</ThemedText>
                        <View style={{alignSelf: "stretch"}}>
                            {stats.map(sts => <PokemonState
                                key={sts.state.name}
                                name={sts.state.name}
                                value={sts.base_stat}
                                color={colorType}
                            />
                            )}
                        </View>
                    </Cards>
            </View>
        </RootView>
    );
}

const styles = StyleSheet.create({
    header: {
        margin: 20,
        justifyContent: "space-between",
    },
    pokeBall: {
        position: "absolute",
        opacity: .1,
        top: 8,
        right: 8,
    },
    imageRow: {
        position: "absolute",
        top: -140,
        zIndex: 2,
        left: 0,
        right: 0,
        justifyContent: "space-between",
        paddingHorizontal: 20,
    },
    artwork: {},
    card: {
        marginTop: 144,
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 20,
        gap: 16,
        alignItems: "center",
    }
})