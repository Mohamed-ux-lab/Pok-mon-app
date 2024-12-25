import {Color} from "@/constants/Color";
import {View, ViewStyle} from "react-native";
import {ThemedText} from "@/components/ThemedText";

type Props = {
    name: keyof typeof Color["type"]
}

export function PokemonType({ name }: Props) {
    return <View style={[rootStyle, {backgroundColor: Color.type[name]}]}>
        <ThemedText
            color="greyWhite"
            variant="subtitle3"
            style={{textTransform: "capitalize"}}
            >
            {name}
        </ThemedText>
    </View>
}

const rootStyle = {
    flex: 0,
    height: 20,
    paddingHorizontal: 8,
    borderRadius: 8,
} satisfies ViewStyle