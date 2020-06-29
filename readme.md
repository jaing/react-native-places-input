# React Native Places Input
Up to date working Google Places Input. Calling directly API not JS SDK.

![exmaples](https://s5.gifyu.com/images/places.gif)

## Latest changes
## 1.1.6
Component is now fetching places if query prop is provided. 
## 1.1.5
If query prop change it will also update a component state.
New configuration props:
* **clearQueryOnSelect** - Clear input query on place select
## 1.1.4
Adding loading indicator for a place details request.
## 1.1.3
New configuration props:
* **query** - Custom query value for a text field


## Installation

    yarn add react-native-places-input
    
or

    npm install react-native-places-input
    
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
        onSelect={place => console.log(place)}
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
googleApiKey | PropTypes.string.isRequired | | Google API key
clearQueryOnSelect | bool | false | Clear input query on place select
iconInput | any | | Icon added to an input
iconResult | any | | Icon added to results
language | string | en | Language for google API call
placeHolder | string | Search places... | placeholder for an input
query | string | | Custom text field value on init
querySession | string | | A random string which identifies an autocomplete session for billing purposes. If this parameter is omitted from an autocomplete request, the request is billed independently. See the pricing sheet for details.
queryTypes | string | | You may restrict results from a Place Autocomplete request to be of a certain type by passing a types parameter. [Google docs](https://developers.google.com/places/web-service/autocomplete#place_types) 
queryFields | string | formatted_address,geometry,name | Fields requested from Google API
queryCountries | array | | Array of country codes to limit results
resultRender | func | place => place.description | Function to render results text
searchLatitude | number |  | Lat to limit results
searchLongitude | number |  | Lng to limit results
searchRadius | number |  | radius to limit results
stylesContainer | object | {} | Custom styles for a container
stylesInput | object | {} | Custom styles for an input
stylesItem | object | {} | Custom styles for an item
stylesItemText | object | {} | Custom styles for an item text
stylesList | object | {} | Custom styles for a list
stylesLoading | object,| {} | Custom styles for a loading indicator
textInputProps | object | {} | Custom TextInput props
requiredCharactersBeforeSearch | number | 2 | Component wont fetch places unless string length is equal this prop
requiredTimeBeforeSearch | number | 1000 | Idle time on text input before component will fetch places
onSelect | func | | Function called when you select a place
onChangeText | func | | Method triggered when TextInput is changed. Returning query and this.

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

### Place types
```javascript
    <PlacesInput
        placeHolder={'Some placeholder'}
        queryTypes="establishment"
        googleApiKey={GOOGLE_API_KEY} 
        onSelect={place => this.setState({place})} 
    />
```

## Common issues
If on click is not working and component is inside a ScrollView make sure to add keyboardShouldPersistTaps = always.

```javascript
     <ScrollView
                keyboardShouldPersistTaps="always"
```
