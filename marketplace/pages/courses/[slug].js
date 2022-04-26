import { Modal } from "@components/common";
import { Curriculum, CourseHero, Keypoint } from "@components/course";
import { getAllCourses } from "@content/courses/fetcher";

export default function Course({course}) {
  return (
    <>
      <div className="py-4">
        <CourseHero 
            title = {course.title}
            description={course.description}
            image={course.coverImage}
        />
      </div>
      <Keypoint 
        points = {course.wsl}
      />
      <Curriculum 
        locked = {true}
        />
      <Modal/>
    </>
  )
}

export function getStaticPaths() {
    const { data } = getAllCourses()
    
    return {
        paths: data.map(c => ({
            params:{
                slug: c.slug
            }
        })),
        fallback: false
    }
}

export function getStaticProps({params}) {
    const { data } = getAllCourses()

    const course = data.filter( c => c.slug == params.slug)[0]

    return {
      props: {
        course
      }  
    }
  }
  