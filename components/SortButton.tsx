import {Dimensions, Image, Modal, Pressable, StyleSheet, View} from "react-native";
import {useThemeColor} from "@/hooks/useThemeColor";
import React, {useRef, useState} from "react";
import {ThemedText} from "@/components/ThemedText";
import {Cards} from "@/components/Cards";
import {Row} from "@/components/Row";
import {Radio} from "@/components/Radio";
import {Shadow} from "@/constants/Shadow";

type Props = {
    value: "id" | "name",
    onChange: (e: "id" | "name") => void
}

const options = [
    {label: "Number", value: "id" },
    {label: "Name", value: "name" },
] as const;

export function SortButton({value, onChange}:Props){
    const buttonRef = useRef<View>(null);
    const [position, setPosition] = useState<null | {
        top: number;
        right: number;
    }>(null);
    const colors = useThemeColor()
    const [isOpen, setIsOpen] = useState(false);
    const onClose = ()=>{
        setIsOpen(false);
    }
    const onButtonPress = () => {
        buttonRef.current?.measureInWindow((x, y, width, height) => {
        setIsOpen(true);
        setPosition({
            top: y + height,
            right: Dimensions.get("window").width - x - width,
        })

        })
    }
    return <>
        <Pressable onPress={onButtonPress}>
            <View style={[styles.button, {backgroundColor: colors.greyBackground}]}>
                <Image source={
                    value == "id" ?
                        require('@/assets/images/num.png') :
                        require('@/assets/images/alph.png')
                }
                       width={16}
                       height={16}
                />
            </View>
        </Pressable>
        <Modal
            animationType={"fade"}
            transparent={true}
            visible={isOpen}
            onRequestClose={onClose}>
            <Pressable style={styles.backDrop} onPress={onClose}></Pressable>
            <View ref={buttonRef} style={[styles.popUp, {backgroundColor: colors.tint, ...position}]}>
                <ThemedText style={styles.title} variant="subtitle2" color="greyWhite">Sort by :</ThemedText>
                <Cards style={styles.card}>
                    {options.map(o =>
                        <Pressable key={o.value} onPress={() => onChange(o.value)}>
                            <Row key={o.value} gap={8}>
                                <Radio checked={o.value == value}/>
                                <ThemedText>{o.label}</ThemedText>
                            </Row>
                        </Pressable>
                    )}
                </Cards>
            </View>
        </Modal>
    </>
}

const styles = StyleSheet.create({
    button: {
        height: 32,
        width: 32,
        borderRadius: 32,
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backDrop: {
        flex: 1,
        backgroundColor: "rgba(0,0,0, 0.3)"
    },
    popUp: {
        position: "absolute",
        width: 112,
        borderRadius: 12,
        paddingTop: 16,
        gap: 16,
        ...Shadow.dp2
    },
    title: {
        paddingLeft: 20,
    },
    card: {
        paddingVertical: 16,
        paddingHorizontal: 20,
        gap: 16,
    }
})