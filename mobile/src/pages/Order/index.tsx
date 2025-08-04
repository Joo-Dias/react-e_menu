
import react from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { useRoute, RouteProp } from '@react-navigation/native'

type RouteDetailsParams = {
    Order: {
        number: string | number;
        order_id: string | number;
    }
}

type OrderRouteProps = RouteProp<RouteDetailsParams, 'Order'>;

export default function Order() {
    const route = useRoute<OrderRouteProps>();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Pedido</Text>
            <Text style={styles.title}>
                {route.params.number}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {},
    title: {}
})