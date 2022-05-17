
import { useWalletInfo } from "@components/hooks/web3"
import { Button } from "@components/ui/common"
import { CourseCard, CourseList } from "@components/ui/course"
import { MarketHeader } from "@components/ui/marketplace"
import { OrderModal } from "@components/ui/order"
import { getAllCourses } from "@content/courses/fetcher"
import { useState } from "react"

export default function Marketplace({courses}) {
  const[selectedCourse, setSelectedCourse] = useState(null)
  const { canPurchaseCourse } = useWalletInfo()

  const purchaseCourse = (order) =>{
    alert(JSON.stringify(order))
  }
  return (
    <>
    <div className="py-4">
      <MarketHeader/>
    </div>
      <CourseList courses = { courses } >
        {
          (course) => 
            <CourseCard 
              key={course.id} 
              course={course}
              disabled={!canPurchaseCourse}
              Footer={() =>
                <div className="mt-4">
                  <Button 
                    onClick={()=> setSelectedCourse(course)}
                    disabled={!canPurchaseCourse}
                    variant="lightPurple">
                    Purchase
                  </Button>
                </div>
              }
            /> 
        }
      </CourseList>
      { selectedCourse &&
        <OrderModal 
          course={selectedCourse}
          onSubmit={purchaseCourse}
          onClose={()=> setSelectedCourse(null)}
          />
      }
    </>
  )
}

export function getStaticProps(){
  const { data } = getAllCourses()
  return {
    props: {
      courses: data
    }  
  }
}
