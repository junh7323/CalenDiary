import React, { Component } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; 
import { Modal } from "@mui/material";


class MyCalendarDia extends Component {
    state = {
        isModalOpen: false,
        newEventTitle: "",
    };

    date = ({
        year: 2023,
        month: 1,
        day: 1
    })

    handleEvents = (events) => {
    // 이벤트가 실행된 후 변경된 상태를 현재 상태에 반영
        // this.setState({
        //   currentEvents: events,
        // });
        console.log("handleEvents")
    };

    handleCloseModal = () => {
        this.setState({
          isModalOpen: false,
          newEventTitle: "",
        });
    };

    // 달력에 등록된 이벤트를 클릭했을때 실행되는 함수(내용 삭제)
    handleEventClick = (selectInfo) => {
        alert("삭제할 이벤트 ID: " + selectInfo.event.id);

        // 클릭한 내용을 삭제할지 물어보는 확인창
        if (window.confirm(`'${selectInfo.event.title}'을 삭제하시겠습니까?`)) {
        // 클릭한 이벤트 내용 삭제
        selectInfo.event.remove();
        }
    };

    handleDateSelect = (selectInfo) => {
        let title = prompt("새로운 내용을 입력해 주세요."); 
        let calendarApi = selectInfo.view.calendar; 
    
        calendarApi.unselect(); 
    
        if (title) {
          calendarApi.addEvent({
            title,
            start: selectInfo.startStr, 
            end: selectInfo.endStr, 
          });
        }
      };

    render() {

        return (
            <div>
                <FullCalendar
                    initialView="dayGridMonth"
                    plugins={[dayGridPlugin, interactionPlugin]}
                    selectable={true}
                    events={[
                        { title: "event 1", date: "2022-09-01" },
                        { title: "event 2", date: "2022-09-02" },
                        { title: "event 2asda", date: "2023-04-10" },
                        { title: "asdadsa", date: "2023-04-11" },
                        { title: "asdasa", date: "2023-04-12" },
                    ]}
                    eventClick={this.handleEventClick}
                    select={this.handleDateSelect}
                    eventsSet={this.handleEvents}
                />
                {this.state.isModalOpen && (
                    <Modal 
                        open={this.state.isModalOpen} 
                        onClose={this.handleCloseModal}
                        appname={"calendar"}  
                        date={this.date}        
                    />
                )}
            </div>
            
        );
    };
}
export default MyCalendarDia;