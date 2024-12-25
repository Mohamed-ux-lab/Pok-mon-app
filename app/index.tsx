import {ActivityIndicator, FlatList, Image, StyleSheet} from "react-native";
import {ThemedText} from "@/components/ThemedText";
import {useThemeColor} from "@/hooks/useThemeColor";
import {Cards} from "@/components/Cards";
import {PokemonCard} from "@/components/Pokemon/PokemonCard";
import {useInfiniteFetchQuery} from "@/hooks/useFetchQuery";
import {getPokemonId} from "@/functions/pokemon";
import {useState} from "react";
import {SearchBar} from "@/components/SearchBar";
import {Row} from "@/components/Row";
import {SortButton} from "@/components/SortButton";
import {RootView} from "@/components/RootView";


export default function Index() {
    const colors = useThemeColor()

    const [sortKey, setSortKey] = useState<"id" | "name">("id");
    const [search, setSearch] = useState('')

    const {data, isFetching, fetchNextPage} = useInfiniteFetchQuery('/pokemon?limit=21')
    const pokedex = data?.pages.flatMap(page => page.results.map(r => (
        {name: r.name, id: getPokemonId(r.url)}))) ?? []

    const filteredPokemon = [...(search
        ? pokedex.filter(p =>
            p.name.includes(search.toLowerCase()) || p.id.toString() == search): pokedex)].sort(
        (a, b) => (a[sortKey] < b[sortKey]) ? -1 : 1
    )

    return (
    <RootView>
        <Row style={styles.header} gap={16}>
            <Image source={require('@/assets/images/pokeball.png')} width={24} height={24}/>
            <ThemedText variant='headline' color="greyWhite">Pokédex</ThemedText>
        </Row>
        <Row gap={16} style={styles.form}>
            <SearchBar value={search} onChange={setSearch}/>
            <SortButton value={sortKey} onChange={setSortKey}/>
        </Row>
        <Cards style={styles.body}>
            <FlatList
                data={filteredPokemon}
                numColumns={3}
                contentContainerStyle={[styles.gridGap, styles.list]}
                columnWrapperStyle={styles.gridGap}
                ListFooterComponent={
                isFetching ? <ActivityIndicator color={colors.tint}/> : null
                }
                onEndReached={search ? undefined :() => fetchNextPage()}
                renderItem={({item}) =>
                <PokemonCard id={item.id} name={item.name} style={{flex: 1/3}}/>}
                keyExtractor={(item) => item.id.toString()}/>
        </Cards>
    </RootView>
  );
}

const styles = StyleSheet.create({
    container: {

    },
    header: {
        paddingHorizontal: 12,
        paddingBottom: 8,
    },
    body: {
        flex: 1,
        marginTop: 16,
    },
    gridGap: {
        gap: 8,
    },
    list: {
        padding: 12,
    },
    form: {
        paddingHorizontal: 12,
    }
})
