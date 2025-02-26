import style from "./page.module.css";
import { fetchVideoDetail, fetchYoutubeVideos } from "../utils/api";
import { IVideoDetail, Video } from "../utils/type";
import VideoItem from "../components/video-item";

type Props = {
    searchParams: Promise<{ q: string }>;
};

interface IEnrichedVideo extends Video {
    viewCount: number;
}

async function SearchResult({ q }: { q: string }) {
    try {
        const searchResults = await fetchYoutubeVideos({ q, maxResults: 24 });

        if (!searchResults || searchResults.items.length !== 24) {
            return <div>검색 결과를 찾을 수 없습니다.</div>;
        }

        console.log(searchResults);

        const videoViewCount: IVideoDetail[] = await Promise.all(
            searchResults.items.map((item: Video) =>
                fetchVideoDetail(item.id.videoId)
            )
        );

        console.log(videoViewCount);

        const addNewVideoData: IEnrichedVideo[] = searchResults.items.map(
            (item: Video, index: number) => ({
                ...item,
                viewCount: parseInt(
                    videoViewCount[index].statistics.viewCount ?? "0"
                ),
            })
        );

        return (
            <>
                <div className={style.video}>
                    {addNewVideoData.map((item: IEnrichedVideo) => (
                        <VideoItem
                            key={item.id.videoId}
                            video={item}
                            viewCount={item.viewCount}
                        />
                    ))}
                </div>
                <div className={style.moreBtn}>
                    <button>더보기</button>
                </div>
            </>
        );
    } catch (error) {
        console.log("Video Fetching Error", error);
        return <div>fetching Error</div>;
    }
}

export default async function Search({ searchParams }: Props) {
    const { q } = await searchParams;

    return (
        <section>
            <SearchResult q={q || ""} />
        </section>
    );
}
