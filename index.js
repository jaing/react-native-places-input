import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    ActivityIndicator,
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

const { height } = Dimensions.get('window');

class PlacesInput extends Component {
    state = {
        query: '',
        places: [],
        showList: false,
        isLoading: false
    };

    timeout = null;

    render() {
        return (
            <View style={[styles.container, this.props.stylesContainer]}>
                <TextInput
                    placeholder={this.props.placeHolder}
                    style={[styles.input, this.props.stylesInput]}
                    onChangeText={query => this.setState({query}, () => this.onPlaceSearch())}
                    value={this.state.query}
                    onFocus={() => this.setState({showList: true})}
                    {...this.props.textInputProps}
                    clearButtonMode="always"
                />
                {this.state.showList && (
                    <ScrollView style={[styles.scrollView, this.props.stylesList]}>
                        {this.state.isLoading && (
                            <ActivityIndicator size="small" style={[styles.loading, this.props.stylesLoading]} />
                        )}
                        {this.state.places.map(place => {
                            return (
                                <TouchableOpacity
                                    key={`place-${place.id}`}
                                    style={[styles.place, this.props.stylesItem]}
                                    onPress={() => this.onPlaceSelect(place.place_id)}
                                >
                                    <Text style={[styles.placeText, this.props.stylesItemText]}>
                                        {this.props.resultRender(place)}
                                    </Text>
                                    {this.props.iconResult}
                                </TouchableOpacity>
                            )
                        })}
                    </ScrollView>
                )}
            </View>
        );
    }


    onPlaceSearch = () => {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(this.fetchPlaces, 1000);
    };

    fetchPlaces = async () => {
        this.setState({
            isLoading: true
        }, async () => {
            const places = await fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${this.state.query}&key=${this.props.googleApiKey}&inputtype=textquery&language=${this.props.language}&fields=${this.props.queryFields}&radius=${this.props.searchRadius}&location=${this.props.searchLatitude},${this.props.searchLongitude}`).then(response => response.json());

            this.setState({
                isLoading: false,
                places: places.predictions
            });
        })

    };

    onPlaceSelect = async id => {
        const place = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${id}&key=${this.props.googleApiKey}&fields=${this.props.queryFields}&language=${this.props.language}`).then(response => response.json());

        return this.setState({
            showList: false,
            query: place.result.formatted_address,
        }, () => {
            return this.props.onSelect && this.props.onSelect(place);
        });
    }
}

PlacesInput.propTypes = {
    stylesInput: PropTypes.object,
    stylesContainer: PropTypes.object,
    stylesList: PropTypes.object,
    stylesItem: PropTypes.object,
    stylesItemText: PropTypes.object,
    stylesLoading: PropTypes.object,
    resultRender: PropTypes.func,
    queryFields: PropTypes.string,
    searchRadius: PropTypes.number,
    searchLatitude: PropTypes.number,
    searchLongitude: PropTypes.number,
    googleApiKey: PropTypes.string.isRequired,
    placeHolder: PropTypes.string,
    textInputProps: PropTypes.object,
    iconResult: PropTypes.any,
    iconInput: PropTypes.any,
    language: PropTypes.string,
    onSelect: PropTypes.func,
};

PlacesInput.defaultProps = {
    stylesInput: {},
    stylesContainer: {},
    stylesList: {},
    stylesItem: {},
    stylesLoading: {},
    stylesItemText: {},
    searchRadius: 1000,
    searchLatitude: 51.905070,
    searchLongitude: 19.458834,
    queryFields: 'formatted_address,geometry,name',
    placeHolder: 'Search places...',
    textInputProps: {},
    language: 'en',
    resultRender: place => place.description
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 10,
        left: 10,
        right: 10,
        zIndex: 1000,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    input: {
        height: 50,
        backgroundColor: '#fff',
        paddingHorizontal: 15
    },
    scrollView: {
        position: 'absolute',
        top: 60,
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: '#fff',
        maxHeight: height
    },
    place: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: 'rgba(0,0,0,0.1)',
        padding: 15,
    },
    placeIcon: {
        position: 'absolute',
        top: 10,
        right: 15,
        color: 'rgba(0,0,0,0.3)'
    },
    placeText: {
        color: 'rgba(0,0,0,0.8)',
        paddingRight: 60
    },
    loading: {
        margin: 10
    }
});

export default PlacesInput;
