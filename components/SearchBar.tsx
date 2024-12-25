import {View, TextInput, Image, StyleSheet} from "react-native";
import {Row} from "@/components/Row";
import {useThemeColor} from "@/hooks/useThemeColor";

type Props = {
    value: string,
    onChange: (s: string) => void,
}

export function SearchBar({value, onChange}: Props) {
    const colors = useThemeColor()
    return <Row gap={8} style={[styles.wrapper, {backgroundColor: colors.greyWhite}]}>
        <Image source={require('@/assets/images/search.png')}
               width={16}
               height={16}
        />
        <TextInput onChangeText={onChange} value={value} style={styles.input} />
    </Row>
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        borderRadius: 16,
        height: 32,
    },
    input: {
        flex: 1,
        height: 10,
        fontSize: 16,
        lineHeight: 10,
    }
})