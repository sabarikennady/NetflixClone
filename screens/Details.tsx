import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
  FlatList,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import data from '../data/movie';
import Icon from 'react-native-vector-icons/Feather';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Picker} from '@react-native-picker/picker';
import EpisodeCard from '../components/EpisodeCard';
import YoutubePlayer from 'react-native-youtube-iframe';

interface Movie {
  id: string;
  title: string;
  year: number;
  numberOfSeasons: number;
  description: string;
  cast: string;
  creator: string;
  seasons: {
    items: {
      id: string;
      name: string;
      episodes: {
        items: {
          id: string;
          title: string;
          poster: string;
          duration: string;
          description: string;
          video: string;
        }[];
      };
    }[];
  };
}

const Details = ({route, navigation}) => {
  const {movie} = route?.params;

  const [isLiked, setIsLiked] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [season, setSeason] = useState('Season 1');
  const [playing, setPlaying] = useState(false);

  return (
    <ScrollView
      stickyHeaderIndices={[0]}
      style={styles.pageContainer}
      showsVerticalScrollIndicator={false}>
      <View>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.navigate('Home')}>
            <Icon name="chevron-left" size={30} color="white" />
          </Pressable>
        </View>
      </View>

      <View style={styles.trailerContainer}>
        {playing ? (
          <YoutubePlayer
            height={300}
            width={Dimensions.get('window').width}
            play={true}
            videoId={movie.videoId || 'R7oJq9lrbZw'}
            webViewProps={{
              javaScriptEnabled: true,
              domStorageEnabled: true,
            }}
            onChangeState={event => {
              if (event === 'ended') setPlaying(false);
            }}
          />
        ) : (
          <>
            <Image
              source={{
                uri: movie.card || movie.poster,
              }}
              style={styles.trailer}
            />
            <Pressable style={styles.playBtn} onPress={() => setPlaying(true)}>
              <Ionicon name="play-sharp" size={30} color="white" />
            </Pressable>
          </>
        )}
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.showName}>{movie.name || data.title}</Text>
        <View style={styles.stats}>
          <Text style={styles.match}>{movie.match || '98% Match'}</Text>
          <Text style={styles.year}>{movie.year || data.year}</Text>
          <Text style={styles.age}>12+</Text>
          <Text style={styles.seasons}>
            {movie.seasons && movie.seasons + ' Seasons'}{' '}
          </Text>
          <MaterialIcons name="hd" size={30} color="white" />
        </View>
        <Pressable style={styles.playButton}>
          <Ionicon name="play-sharp" size={30} color="black" />
          <Text style={styles.playText}>Play</Text>
        </Pressable>
        <Pressable style={styles.downloadBtn}>
          <Octicons name="download" size={30} color="white" />
          <Text style={styles.downloadText}>Download</Text>
        </Pressable>
        <Text style={styles.description}>
          {movie.description || data.description}
        </Text>
        <Text ellipsizeMode="tail" numberOfLines={1} style={styles.cast}>
          Cast: {movie.cast || data.cast}
        </Text>
        <Text style={styles.creator}>
          Creator: {movie.creator || data.creator}
        </Text>
      </View>
      <View style={styles.buttonGroup}>
        <Pressable
          style={styles.button}
          onPress={() => {
            setIsAdded(!isAdded);
          }}>
          {isAdded ? (
            <Octicons name="checklist" size={30} color="red" />
          ) : (
            <Icon name="plus" size={30} color="white" />
          )}
          <Text style={styles.buttonText}>My List</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => {
            setIsLiked(!isLiked);
          }}>
          {isLiked ? (
            <Icon name="thumbs-up" size={30} color="red" />
          ) : (
            <Icon name="thumbs-up" size={30} color="white" />
          )}
          <Text style={styles.buttonText}>Rate</Text>
        </Pressable>
        <Pressable style={styles.button}>
          <Icon name="share" size={30} color="white" />
          <Text style={styles.buttonText}>Share</Text>
        </Pressable>
      </View>

      {movie?.seasons && (
        <>
          <View style={styles.episodeOpions}>
            <Pressable style={styles.episodeBtn}>
              <Text style={styles.episodeText}>Episodes</Text>
            </Pressable>
            <Pressable style={styles.more}>
              <Text style={styles.moreText}>More Like This</Text>
            </Pressable>
          </View>
          <Picker
            style={styles.picker}
            selectedValue={season}
            onValueChange={(itemValue, itemIndex) => {
              setSeason(itemValue);
            }}>
            <Picker.Item label="Season 1" value="Season 1" />
            <Picker.Item label="Season 2" value="Season 2" />
          </Picker>
          <View style={styles.episodeContainer}>
            <FlatList
              data={
                season === 'Season 1'
                  ? data.seasons.items[0].episodes.items
                  : data.seasons.items[1].episodes.items
              }
              renderItem={({item}) => (
                <EpisodeCard
                  title={item.title}
                  poster={item.poster}
                  duration={item.duration}
                  description={item.description}
                />
              )}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    height: 70,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  trailerContainer: {
    height: 300,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  trailer: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  playBtn: {
    position: 'absolute',
    borderColor: 'red',
    height: 60,
    width: 60,
    padding: 8,
    borderWidth: 1.5,
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  audioBtn: {
    position: 'absolute',
    height: 40,
    width: 40,
    padding: 8,
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    right: 20,
    bottom: 20,
  },
  detailsContainer: {
    padding: 15,
  },
  showName: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    gap: 10,
  },
  match: {
    color: 'green',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  year: {
    color: 'grey',
    fontSize: 16,
    marginRight: 10,
  },
  age: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
    backgroundColor: 'yellow',
    padding: 3,
    borderRadius: 5,
  },
  seasons: {
    color: 'grey',
    fontSize: 16,
    marginRight: 10,
  },
  playButton: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  playText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  downloadBtn: {
    backgroundColor: 'grey',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  downloadText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  description: {
    color: 'lightgrey',
    fontSize: 16,
    marginVertical: 10,
  },
  cast: {
    color: 'lightgrey',
    fontSize: 12,
    marginVertical: 5,
  },
  creator: {
    color: 'lightgrey',
    fontSize: 12,
    marginVertical: 5,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    gap: 10,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 5,
    marginVertical: 0,
    flex: 1,
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    margin: 5,
  },
  episodeOpions: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginHorizontal: 20,
    gap: 10,
    width: '80%',
  },
  episodeBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    borderTopColor: 'red',
    borderTopWidth: 5,
    width: '35%',
  },
  episodeText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    margin: 5,
  },
  more: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    flex: 1,
  },
  moreText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    margin: 5,
  },
  picker: {
    width: '50%',
    color: 'white',
    marginHorizontal: 20,
    marginTop: 10,
  },
  pickerItem: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  episodeContainer: {
    flex: 1,
    marginBottom: 60,
  },
});

export default Details;
