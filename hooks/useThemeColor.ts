import {useColorScheme} from "react-native";
import {Color} from "@/constants/Color";

export function useThemeColor (){
    const theme = useColorScheme() ?? 'light'
    return Color[theme]
}