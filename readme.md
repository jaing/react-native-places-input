# React Native Places Input
Up to date working Google Places Input. Calling directly API not JS SDK.

![exmaples](https://s5.gifyu.com/images/places.gif)

## Installation

    yarn add react-native-places-input
    
or

    npm intsall react-native-places-input
    
## Usage
Fairly easy. Few required props but most of the work is already done in a component.

### Basic

```javascript
import PlacesInput from 'react-native-places-input';
```

And inside a component

```javascript
    <PlacesInput
        googleApiKey={GOOGLE_API_KEY}
        onSelect={place => console.log(place}
    />
```

```javascript
class InputWrapper extends React.Component {
    render() {
        return (
            <View style={{ width: '100%' }}>
                <PlacesInput
                    googleApiKey={GOOGLE_API_KEY}
                    placeHolder={"Some Place holder"}
                    language={"en-US"}
                    onSelect={place => {
                        this.props.goToPoint(get(place, 'result.geometry.location.lat'), get(place, 'result.geometry.location.lng'))
                    }}
                    iconResult={<Ionicons name="md-pin" size={25} style={styles.placeIcon}/>}
                />
            </View>
        );
    }
}
```

### Configuration props
List of props supported by a component

Prop       | Type    | Default    | Description
---------- | ------- | ---------- | -----------------------
googleApiKey | PropTypes.string.isRequired, | | Google API key
iconInput | PropTypes.any, | | Icon added to an input
iconResult | PropTypes.any, | | Icon added to results
language | PropTypes.string, | en | Language for google API call
placeHolder | PropTypes.string, | Search places... | placeholder for an input
queryFields | PropTypes.string, | formatted_address,geometry,name | Fields requested from Google API
queryCountries | PropTypes.array | | Array of country codes to limit results
resultRender | PropTypes.func, | place => place.description | Function to render results text
searchLatitude | PropTypes.number, |  | Lat to limit results
searchLongitude | PropTypes.number, |  | Lng to limit results
searchRadius | PropTypes.number, |  | radius to limit results
stylesContainer | PropTypes.object, | {} | Custom styles for a container
stylesInput | PropTypes.object,| {} | Custom styles for an input
stylesItem | PropTypes.object,| {} | Custom styles for an item
stylesItemText | PropTypes.object,| {} | Custom styles for an item text
stylesList | PropTypes.object,| {} | Custom styles for a list
stylesLoading | PropTypes.object,| {} | Custom styles for a loading indicator
textInputProps | PropTypes.object, | {} | Custom TextInput props
onSelect | PropTypes.func, | | Function called when you select a place

## Examples
### Inline


![exmaples](https://s5.gifyu.com/images/ezgif-3-2569ff9b1625.gif)

```javascript
    <PlacesInput
        placeHolder={'Some placeholder'}
        stylesContainer={{
            position: 'relative',
            alignSelf: 'stretch',
            margin: 0,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            shadowOpacity: 0,
            borderColor: '#dedede',
            borderWidth: 1,
            marginBottom: 10
        }}
        stylesList={{
            top: 50,
            borderColor: '#dedede',
            borderLeftWidth: 1,
            borderRightWidth: 1,
            borderBottomWidth: 1,
            left: -1,
            right: -1
        }}
        googleApiKey={GOOGLE_API_KEY} 
        onSelect={place => this.setState({place})} 
    />
```

### Limit results to a country

```javascript
    <PlacesInput
        placeHolder={'Some placeholder'}
        queryCountries={['pl', 'fr']}
        googleApiKey={GOOGLE_API_KEY} 
        onSelect={place => this.setState({place})} 
    />
```


### Limit results to a location

```javascript
    <PlacesInput
        placeHolder={'Some placeholder'}
        searchRadius={500}
        searchLatitude={51.905070}
        searchLongitude={19.458834}
        googleApiKey={GOOGLE_API_KEY} 
        onSelect={place => this.setState({place})} 
    />
```
