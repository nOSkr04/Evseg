import { Dimensions, StyleSheet } from "react-native";
import React, { memo, useMemo } from "react";
import RenderHtml from "react-native-render-html";
import Colors from "../../constants/colors";
import useColorScheme from "../../hooks/use-color-scheme";
import { ScrollView } from "../../widgets/themed";

const { width } = Dimensions.get("window");

const PrivacyDetailScreen = memo(() => {
    const theme = useColorScheme();
    const textColor = Colors[theme].text;
    const tagsStyles = useMemo(() => (
        {
            h1: {
                color: textColor,
            },
            p: {
                color: textColor,
            },
            li: {
                color: textColor
            },
            ol: {
                color: textColor
            }
        }
    ), [textColor]);
    const source = {
        html: `
        <p>Үйлчилгээний нөхцөл</p>
        <ol>
        <li>Ерөнхий нөхцөл
        <ol>
        <li>Sedu апп нь хэрэглэгчид Бэлгийн боловсрол олгох мэдээ мэдээлэл, зураг, контент, сургалт, зөвлөгөө өгөхтэй холбоотой үүсэх харилцааг зохицуулахад оршино.</li>
        <li>Энэхүү нөхцөл нь хэрэглэгч дээрх үйлчилгээг авахаас өмнө хүлээн зөвшөөрч баталгаажуулсны үндсэн дээр хэрэгжинэ.</li>
        <li>Хэрэглэгч 18 нас хүрсэн, эрх зүйн бүрэн чадамжтай байна.</li>
        <li>Sedu апп дээрх мэдээ мэдээлэл, зураг, контент, сургалт, зөвлөгөөг ашиг олох зорилгоор хуулбарлаж олшруулах, дуурайх, өөр бусад ямар ч зүйлд ашиглахыг хориглоно.</li>
        </ol>
        </li>
        </ol>
        <ol start="2">
        <li>Хэрэглэгчийн бүртгэл
        <ol>
        <li>Sedu апп-р үйлчлүүлэхдээ хэрэглэгч бүртгүүлсэн байна. Бүртгэлд нэвтрэх нэр, нэвтрэх нууц пин код үүсгэж илгээхийг заасан хүснэгтэд бөглөнө.</li>
        <li>Хэрэглэгчийн мэдээллийн нууцлалыг бид бүрэн хамгаална.</li>
        <li>Хэрэглэгчийн мэдээллийн үнэн зөв, бодит байдалд хэрэглэгч бүрэн хариуцлага хүлээнэ.</li>
        <li>Хэрэглэгч өөрийн үүсгэсэн нэвтрэх нэр болон нэвтрэх пин кодоо мартсан тохиолдолд бид хариуцлага хүлээхгүй.</li>
        </ol>
        </li>
        <li>Төлбөр тооцоо
        <ol>
        <li>Хэрэглэгчийн эрх нээлгэхэд сарын 20,000 төгрөг байна.</li>
        <li>Төлбөр буцаагдахгүй.</li>
        <li>Төлбөрийг QPay шилжүүлгээр хийнэ.</li>
        </ol>
        </li>
        </ol>
        <ol start="4">
        <li>Бусад
        <ol>
        <li>Садар самуун явдалтай тэмцэх тухай хуульд заасан хязгаарлалтын хүрээнд олгох мэдээ мэдээлэл, зураг, контент, зөвлөгөөг танд хүргэх болно.</li>
        </ol>
        </li>
        </ol>
        <p>&nbsp;</p>`
    };
    return (
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <RenderHtml
                contentWidth={width}
                source={source}
                tagsStyles={tagsStyles}
            />
      </ScrollView>
    );
});

PrivacyDetailScreen.displayName = "PrivacyDetailScreen";

export { PrivacyDetailScreen };

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});
